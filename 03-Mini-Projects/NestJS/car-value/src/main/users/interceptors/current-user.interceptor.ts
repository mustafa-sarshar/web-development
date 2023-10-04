import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { UsersService } from "../users.service";
import { User } from "../entities/user.entity";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private readonly _usersService: UsersService) {}

  public async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};

    if (userId) {
      const userFound: User = await this._usersService.findOneById(userId);
      request.currentUser = userFound;
    }

    return next.handle();
  }
}
