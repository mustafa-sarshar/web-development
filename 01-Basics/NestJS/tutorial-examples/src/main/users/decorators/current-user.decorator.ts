import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

declare module "express" {
  interface Request {
    user: any;
  }
}

export const User = createParamDecorator<string>(
  (data: string, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);
