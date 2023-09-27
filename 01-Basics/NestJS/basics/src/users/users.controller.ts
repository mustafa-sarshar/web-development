import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Response } from "express";
import { UserModel } from "./models/user.model";
import { UsernamePipe } from "src/shared/pipes/username/username.pipe";
import { AuthGuard } from "src/shared/guards/auth/auth.guard";

@Controller("users")
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(
    @Res() res: Response,
    @Body(new UsernamePipe()) createUserDto: CreateUserDto,
  ) {
    const userNew = this._usersService.create(createUserDto);
    res.status(HttpStatus.CREATED).json({ result: userNew });
  }

  @Get()
  findAll(@Res() res: Response) {
    const users: UserModel[] = this._usersService.findAll();
    res.status(HttpStatus.OK).json({ result: users });
  }

  @Get(":id")
  @UseGuards(AuthGuard)
  findOne(@Param("id") id: string) {
    return this._usersService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this._usersService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this._usersService.remove(+id);
  }
}
