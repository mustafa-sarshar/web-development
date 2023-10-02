import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";

import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("auth")
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  @Post("/sign-up")
  public createUser(@Body() createUserDto: CreateUserDto) {
    this._usersService.create(createUserDto.email, createUserDto.password);
  }

  @Get("/:id")
  public findUserById(@Param("id") userId: string) {
    return this._usersService.findOne(parseInt(userId));
  }

  @Get()
  public findAllUsers(@Query("email") email: string) {
    return this._usersService.find(email);
  }

  @Delete("/:id")
  public removeUser(@Param("id") userId: string) {
    return this._usersService.remove(parseInt(userId));
  }

  @Patch("/:id")
  public updateUser(
    @Param("id") userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this._usersService.update(parseInt(userId), updateUserDto);
  }
}
