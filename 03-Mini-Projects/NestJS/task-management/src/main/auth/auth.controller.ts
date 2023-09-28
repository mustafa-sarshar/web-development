import { Body, Controller, Post } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto/sign-up.dto";
import { CreateUserDto } from "src/main/users/dto/create-user.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { User } from "../users/entities/user.entity";

@Controller("auth")
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post("sign-up")
  public signUp(@Body() signUpDto: SignUpDto): Promise<User> {
    const createUserDto: CreateUserDto = {
      email: signUpDto.email,
      password: signUpDto.password,
    };

    return this._authService.signUp(createUserDto);
  }

  @Post("sign-in")
  public signIn(@Body() signInDto: SignInDto): Promise<{
    accessToken: string;
  }> {
    return this._authService.signIn(signInDto);
  }
}
