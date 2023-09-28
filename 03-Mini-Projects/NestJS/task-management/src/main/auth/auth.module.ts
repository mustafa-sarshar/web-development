import { Module, OnModuleInit } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersService } from "src/main/users/users.service";
import { User } from "src/main/users/entities/user.entity";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      global: true,
      secret:
        "deb2518e9efe85718e31ca241a964c47d30ba7f612ddaa9bb8ee1536e1263543034e45aa5c85bd5c2c0acb117b18b5d7",
      signOptions: { expiresIn: "60s" },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
})
export class AuthModule {}
