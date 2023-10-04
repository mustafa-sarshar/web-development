import { BadRequestException, Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

import { UsersService } from "../users/users.service";
import { User } from "../users/entities/user.entity";

@Injectable()
export class AuthService {
  private readonly saltRounds: number = 10;
  constructor(private readonly _usersService: UsersService) {}

  public async signUp(email: string, password: string): Promise<User> {
    const userFound: User[] = await this._usersService.findByEmail(email);

    if (userFound.length) {
      throw new BadRequestException("email in use");
    }

    const salt: string = await bcrypt.genSalt(this.saltRounds);
    const passwordHashed: string = await bcrypt.hash(password, salt);
    const userNew: User = await this._usersService.create(
      email,
      passwordHashed,
    );

    return userNew;
  }

  public async signIn(email: string, password: string): Promise<User> {
    const userFound: User = await this._usersService.findOneByEmail(email);
    const passValidation: boolean = await bcrypt.compare(
      password,
      userFound.password,
    );

    if (!passValidation) {
      throw new BadRequestException("invalid credentials");
    }

    return userFound;
  }
}
