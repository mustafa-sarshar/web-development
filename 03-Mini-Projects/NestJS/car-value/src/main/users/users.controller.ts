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
  UseGuards,
} from "@nestjs/common";

import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserDto } from "./dto/user.dto";
import { User } from "./entities/user.entity";
import { DataSerializer } from "../../shared/interceptors/serialize.interceptor";
import { AuthService } from "../auth/auth.service";
import { LoginUserDto } from "./dto/login-user";
import { CurrentUser } from "./decorators/current-user/current-user.decorator";
import { AuthGuard } from "../auth/guards/auth.guard";

@Controller("auth")
@DataSerializer(UserDto)
export class UsersController {
  constructor(
    private readonly _usersService: UsersService,
    private readonly _authService: AuthService,
  ) {}

  @Get("/whoami")
  @UseGuards(AuthGuard)
  public whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Post("/sign-up")
  public async createUser(
    @Body() createUserDto: CreateUserDto,
    @Session() session: any,
  ): Promise<User> {
    const user = await this._authService.signUp(
      createUserDto.email,
      createUserDto.password,
    );
    session.userId = user._id;

    return user;
  }

  @Post("/sign-in")
  public async loginUser(
    @Body() loginUserDto: LoginUserDto,
    @Session() session: any,
  ): Promise<User> {
    const user = await this._authService.signIn(
      loginUserDto.email,
      loginUserDto.password,
    );
    session.userId = user._id;

    return user;
  }

  @Get("/sign-out")
  public async signOut(@Session() session: any) {
    session.userId = null;
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
