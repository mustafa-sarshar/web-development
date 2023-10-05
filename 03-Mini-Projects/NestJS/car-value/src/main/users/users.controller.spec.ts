import { Test, TestingModule } from "@nestjs/testing";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import * as bcrypt from "bcrypt";

import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { AuthService } from "../auth/auth.service";
import { User } from "./entities/user.entity";

describe("UsersController", () => {
  const users: User[] = [];
  const saltRounds: number = 10;
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      findOneById: (_id: number) => {
        const userFound = users.find((user: User) => user._id === _id);

        return Promise.resolve(userFound);
      },
      findByEmail: (email: string) => {
        if (!email) {
          return Promise.resolve(users);
        }

        const usersFiltered = users.filter(
          (user: User) => user.email === email,
        );

        return Promise.resolve(usersFiltered);
      },
      findOneByEmail: (email: string) => {
        const usersFiltered = users.filter(
          (user: User) => user.email === email,
        );

        if (!usersFiltered[0]) {
          throw new NotFoundException("user not found");
        }

        return Promise.resolve(usersFiltered[0]);
      },
      create: (email: string, password: string) => {
        const randomId: number = Math.floor(Math.random() * 1000);
        const userNew: User = { _id: randomId, email, password } as User;

        users.push(userNew);
        return Promise.resolve(userNew);
      },
      update: (_id: number, attrs: Partial<User>) => {
        let userUpdate: User = null;
        const userUpdateIndex: number = users.findIndex(
          (user: User) => user._id === _id,
        );

        if (userUpdateIndex > -1) {
          Object.assign(users[userUpdateIndex], attrs);
          userUpdate = users[userUpdateIndex];
        }

        return Promise.resolve(userUpdate);
      },
      remove: (_id: number) => {
        let userDelete: User = null;
        const userDeleteIndex: number = users.findIndex(
          (user: User) => user._id === _id,
        );

        if (userDeleteIndex > -1) {
          userDelete = users[userDeleteIndex];
          users.slice(userDeleteIndex, 1);
        }
        return Promise.resolve(userDelete);
      },
    };
    fakeAuthService = {
      signUp: async (email, password) => {
        const usersFound: User[] = await fakeUsersService.findByEmail(email);

        if (usersFound.length) {
          throw new BadRequestException("email in use");
        }

        const salt: string = await bcrypt.genSalt(saltRounds);
        const passwordHashed: string = await bcrypt.hash(password, salt);
        const userNew: User = await fakeUsersService.create(
          email,
          passwordHashed,
        );

        return userNew;
      },
      signIn: async (email, password) => {
        const userFound: User = await fakeUsersService.findOneByEmail(email);
        const passValidation: boolean = await bcrypt.compare(
          password,
          userFound.password,
        );

        if (!passValidation) {
          throw new BadRequestException("invalid credentials");
        }

        return userFound;
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: fakeUsersService },
        { provide: AuthService, useValue: fakeAuthService },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("findAllUsers finds no users", async () => {
    const usersFound: User[] = await controller.findAllUsers("user1@mail.com");

    expect(usersFound.length).toBe(0);
  });

  it("findAllUsers finds three user by email", async () => {
    await fakeAuthService.signUp("user1@mail.com", "user1@123@ABC");
    await fakeAuthService.signUp("user2@mail.com", "user2@123@ABC");
    await fakeAuthService.signUp("user3@mail.com", "user3@123@ABC");

    const usersFound: User[] = await controller.findAllUsers("");
    expect(usersFound.length).toBe(3);
  });

  it("findUserById finds no one", async () => {
    const usersFound: User = await controller.findUserById("1");

    expect(usersFound).toBeUndefined();
  });

  it("loginUser updates the session object and returns the current user", async () => {
    const session: any = {};
    const userLogin: User = await controller.loginUser(
      { email: "user1@mail.com", password: "user1@123@ABC" },
      session,
    );

    expect(session.userId).toEqual(userLogin._id);
  });
});
