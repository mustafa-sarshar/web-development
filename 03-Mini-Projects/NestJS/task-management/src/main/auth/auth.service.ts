import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

import { UsersService } from "src/main/users/users.service";
import { SignUpDto } from "./dto/sign-up.dto";
import { CreateUserDto } from "src/main/users/dto/create-user.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { FindUserDto } from "src/main/users/dto/find-user.dto";
import { User } from "src/main/users/entities/user.entity";
import { JwtPayload } from "src/shared/jwt/jwt.payload";

@Injectable()
export class AuthService {
  constructor(
    private readonly _usersService: UsersService,
    private readonly _jwtService: JwtService,
  ) {}

  public async signUp(signUpDto: SignUpDto): Promise<User> {
    const createUserDto: CreateUserDto = {
      email: signUpDto.email,
      password: signUpDto.password,
    };

    return this._usersService.createUser(createUserDto);
  }

  public async signIn(signInDto: SignInDto): Promise<{
    accessToken: string;
  }> {
    const findUserDto: FindUserDto = { email: signInDto.email };
    const userFound: User = await this._usersService.findUser(findUserDto);
    const passValidation: boolean = await bcrypt.compare(
      signInDto.password,
      userFound.password,
    );

    if (passValidation) {
      const payload: JwtPayload = { email: signInDto.email };
      const accessToken: string = await this._jwtService.signAsync(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException("invalid credentials");
    }
  }
}
