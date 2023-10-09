import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

declare module "express" {
  interface Request {
    currentUser: string;
  }
}

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    return request.currentUser;
  },
);
