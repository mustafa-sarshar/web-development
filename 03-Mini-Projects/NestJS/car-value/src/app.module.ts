import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { ReportsModule } from "./reports/reports.module";
import { User } from "./users/entities/user.entity";
import { Report } from "./reports/entities/report.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "database.sqlite.db",
      entities: [User, Report],
      synchronize: true,
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
