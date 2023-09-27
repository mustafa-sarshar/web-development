import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const auth = req.headers.authorization;

    if (!auth) {
      throw new UnauthorizedException();
    }
    if (auth === "ABC") {
      next();
    } else {
      throw new HttpException("Invalid Auth Token", HttpStatus.FORBIDDEN);
    }
  }
}
