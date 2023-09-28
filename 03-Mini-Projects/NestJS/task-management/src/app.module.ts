import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";

import { TasksModule } from "./main/tasks/tasks.module";
import { AuthModule } from "./main/auth/auth.module";
import { UsersModule } from "./main/users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env["DB_HOST"],
      port: parseInt(process.env["DB_PORT"], 10) || 5432,
      username: process.env["DB_USERNAME"],
      password: process.env["DB_PASSWORD"],
      database: process.env["DB_DATABASE"],
      autoLoadEntities: true,
      synchronize: true,
    }),
    TasksModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
