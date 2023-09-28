import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import { FindUserDto } from "./dto/find-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly _usersRepository: Repository<User>,
  ) {}

  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;
    const salt = await bcrypt.genSalt(parseInt(process.env["HASH_SALT"]));
    const passwordHashed = await bcrypt.hash(password, salt);
    const userNew: User = this._usersRepository.create({
      email,
      password: passwordHashed,
    });

    try {
      await this._usersRepository.save(userNew);

      return { ...userNew };
    } catch (err: any) {
      // duplicate error
      if (err.code === "23505") {
        throw new ConflictException("username already exists");
      }

      throw new InternalServerErrorException();
    }
  }

  public async findUser(findUserDto: FindUserDto): Promise<User> {
    const userFound = await this._usersRepository.findOne({
      where: { email: findUserDto.email },
    });

    if (!userFound) {
      throw new NotFoundException("user not found");
    }

    return { ...userFound };
  }
}
