import { Test, TestingModule } from "@nestjs/testing";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import * as bcrypt from "bcrypt";

import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import { User } from "../users/entities/user.entity";

describe("AuthService", () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  const [email1, password1] = ["user1@mail.com", "user1@123@ABC"];
  const [email2, password2] = ["user2@mail.com", "user2@123@ABC"];

  beforeEach(async () => {
    const users: User[] = [];

    // Overwrite the methods in UsersService
    fakeUsersService = {
      findByEmail: (email: string) => {
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
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          // Use a fake UsersService to be able to run our tests
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("creates a new user with a salted and hashed password", async () => {
    const userNew: User = await service.signUp(email1, password1);
    const passValidation: boolean = await bcrypt.compare(
      password1,
      userNew.password,
    );

    expect(userNew.email).toBe(email1);
    expect(userNew.password).not.toEqual(password1);
    expect(passValidation).toBe(true);
  });

  it("throws an error if user signs up with email that is in use", async () => {
    await service.signUp(email1, password1);
    await expect(service.signUp(email1, password1)).rejects.toThrow(
      BadRequestException,
    );
  });

  it("throws an error if signs in is called with a wrong email", async () => {
    await service.signUp(email1, password1);
    await expect(service.signIn(email2, password2)).rejects.toThrow(
      NotFoundException,
    );
  });

  it("throws an error if an invalid password is provided", async () => {
    // Overwrite the findOneByEmail method
    fakeUsersService.findOneByEmail = () =>
      Promise.resolve({ email: email1, password: "wrong-password" } as User);
    await expect(service.signIn(email1, password1)).rejects.toThrow(
      BadRequestException,
    );
  });

  it("returns a user object if correct credentials are provided", async () => {
    await service.signUp(email1, password1);
    const user: User = await service.signIn(email1, password1);

    expect(user).toBeDefined();
  });
});
