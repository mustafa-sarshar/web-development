import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseInterceptors,
} from "@nestjs/common";

import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserDto } from "./dto/user.dto";
import { User } from "./entities/user.entity";
import { SerializeInterceptor } from "src/shared/interceptors/serialize.interceptor";
import { AuthService } from "../auth/auth.service";
import { LoginUserDto } from "./dto/login-user";

@Controller("auth")
@UseInterceptors(new SerializeInterceptor(UserDto))
export class UsersController {
  constructor(
    private readonly _usersService: UsersService,
    private readonly _authService: AuthService,
  ) {}

  @Get("/colors/:color")
  public setColor(@Param("color") color: string, @Session() session: any) {
    session.color = color;
  }

  @Get("/colors")
  public getColor(@Session() session: any) {
    return session.color;
  }

  @Post("/sign-up")
  public createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this._authService.signUp(
      createUserDto.email,
      createUserDto.password,
    );
  }

  @Post("/sign-in")
  public loginUser(@Body() loginUserDto: LoginUserDto): Promise<User> {
    return this._authService.signIn(loginUserDto.email, loginUserDto.password);
  }

  @Get("/:id")
  public findUserById(@Param("id") userId: string): Promise<User> {
    return this._usersService.findOneById(parseInt(userId));
  }

  @Get()
  public findAllUsers(@Query("email") email: string): Promise<User[]> {
    return this._usersService.findByEmail(email);
  }

  @Delete("/:id")
  public removeUser(@Param("id") userId: string): Promise<User> {
    return this._usersService.remove(parseInt(userId));
  }

  @Patch("/:id")
  public updateUser(
    @Param("id") userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this._usersService.update(parseInt(userId), updateUserDto);
  }
}
