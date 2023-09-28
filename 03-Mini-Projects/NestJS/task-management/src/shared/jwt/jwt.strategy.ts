import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { jwtConstants } from "./jwt.constants";
import { JwtPayload } from "./jwt.payload";
import { User } from "src/main/users/entities/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private readonly _usersRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  public async validate(payload: JwtPayload): Promise<User> {
    const { email } = payload;
    const userFound: User = await this._usersRepository.findOne({
      where: { email },
    });

    if (!userFound) {
      throw new UnauthorizedException();
    }

    return userFound;
  }
}
