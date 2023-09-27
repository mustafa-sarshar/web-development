import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserModel } from "./models/user.model";

@Injectable()
export class UsersService {
  private readonly _users = [];

  create(createUserDto: CreateUserDto): UserModel {
    try {
      const userNew: UserModel = new UserModel(
        createUserDto.username,
        createUserDto.email,
        createUserDto.password,
      );
      this._users.push(userNew);

      return { ...userNew };
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  findAll(): UserModel[] {
    return [...this._users];
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
