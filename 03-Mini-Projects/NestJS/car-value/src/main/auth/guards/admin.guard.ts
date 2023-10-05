import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

import { User } from "src/main/users/entities/user.entity";

@Injectable()
export class AdminGuard implements CanActivate {
  public canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const currentUser: User = request.currentUser;

    if (!currentUser) {
      return false;
    }

    return currentUser.admin;
  }
}
