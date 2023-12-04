import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SerialportService } from "./serialport/serialport.service";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, SerialportService],
})
export class AppModule {}
