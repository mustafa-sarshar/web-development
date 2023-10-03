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

  public async findOneById(_id: number): Promise<User> {
    const userFound: User = await this._userRepository.findOneBy({ _id });

    if (!userFound) {
      throw new NotFoundException("user not found");
    }

    return userFound;
  }

  public async findOneByEmail(email: string): Promise<User> {
    const userFound: User = await this._userRepository.findOneBy({ email });

    if (!userFound) {
      throw new NotFoundException("user not found");
    }

    return userFound;
  }

  public findByEmail(email: string): Promise<User[]> {
    return this._userRepository.find({ where: { email } });
  }

  public async update(_id: number, attrs: Partial<User>): Promise<User> {
    const userFound: User = await this.findOneById(_id);

    Object.assign(userFound, attrs);
    return this._userRepository.save(userFound);
  }

  public async remove(_id: number): Promise<User> {
    const userFound = await this.findOneById(_id);

    return this._userRepository.remove(userFound);
  }
}
