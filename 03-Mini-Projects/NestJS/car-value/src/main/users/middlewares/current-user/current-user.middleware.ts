import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

import { UsersService } from "../../users.service";
import { User } from "../../entities/user.entity";

// declare global {
//   namespace Express {
//     interface Request {
//       currentUser?: User;
//     }
//   }
// }

declare module "express" {
  interface Request {
    currentUser?: User;
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private readonly _usersService: UsersService) {}

  public async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session || {};

    if (userId) {
      const currentUser: User = await this._usersService.findOneById(userId);
      req.currentUser = currentUser;
    }

    next();
  }
}
