import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./main/users/users.module";
import { CatsModule } from "./main/cats/cats.module";
import { LoggerMiddleware } from "./shared/middlewares/logger/logger.middleware";

@Module({
  imports: [UsersModule, CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: "cats", method: RequestMethod.GET });
  }
}
