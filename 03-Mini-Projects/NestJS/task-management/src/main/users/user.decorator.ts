import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { Request } from "express";

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): User => {
    const req: Request = ctx.switchToHttp().getRequest();

    return req.user as User;
  },
);
