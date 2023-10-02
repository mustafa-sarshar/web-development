import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly _userRepository: Repository<User>,
  ) {}

  public create(email: string, password: string): Promise<User> {
    const userNew: User = this._userRepository.create({ email, password });

    return this._userRepository.save(userNew);
  }

  public async findOne(_id: number): Promise<User> {
    const userFound = await this._userRepository.findOneBy({ _id });

    if (!userFound) {
      throw new NotFoundException("user not found");
    }

    return userFound;
  }

  public find(email: string): Promise<User[]> {
    return this._userRepository.find({ where: { email } });
  }

  public async update(_id: number, attrs: Partial<User>): Promise<User> {
    const userFound = await this.findOne(_id);

    Object.assign(userFound, attrs);
    return this._userRepository.save(userFound);
  }

  public async remove(_id: number): Promise<User> {
    const userFound = await this.findOne(_id);

    return this._userRepository.remove(userFound);
  }
}
