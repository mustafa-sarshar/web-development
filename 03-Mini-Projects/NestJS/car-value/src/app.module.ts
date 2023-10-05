import { MiddlewareConsumer, Module, ValidationPipe } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { APP_PIPE } from "@nestjs/core";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./main/users/users.module";
import { User } from "./main/users/entities/user.entity";
import { ReportsModule } from "./main/reports/reports.module";
import { Report } from "./main/reports/entities/report.entity";

// eslint-disable-next-line
const cookieSession = require("cookie-session");

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: "sqlite",
          database: config.get<string>("DB_DATABASE"),
          entities: [User, Report],
          synchronize:
            config.get<string>("DB_SYNCHRONIZE") === "true" ? true : false,
        };
      },
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // Make the pipes global for e2e test to work.
    { provide: APP_PIPE, useValue: new ValidationPipe({ whitelist: true }) },
  ],
})
export class AppModule {
  constructor(private readonly _configService: ConfigService) {}
  // Add a global middleware that adds cookie session to the entire app
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [this._configService.get<string>("COOKIE_SECRET_KEY")],
        }),
      )
      .forRoutes("*");
  }
}
