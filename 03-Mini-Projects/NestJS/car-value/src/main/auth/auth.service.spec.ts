import { Test, TestingModule } from "@nestjs/testing";

import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import { User } from "../users/entities/user.entity";

describe("AuthService", () => {
  let service: AuthService;

  const fakeUsersService: Partial<UsersService> = {
    findByEmail: () => Promise.resolve([]),
    create: (email: string, password: string) => {
      const userNew: User = new User();
      userNew._id = 1;
      userNew.email = email;
      userNew.password = password;

      return Promise.resolve(userNew);
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        {
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
});
