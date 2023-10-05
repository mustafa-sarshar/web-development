import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
  (_data: never, context: ExecutionContext) => {
    const request: any = context.switchToHttp().getRequest();

    return request.currentUser;
  },
);
