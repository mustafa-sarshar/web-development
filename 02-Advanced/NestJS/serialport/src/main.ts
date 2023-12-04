import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SerialportService } from "./serialport/serialport.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const serialportService = app.get(SerialportService);

  // Open the serial port
  await serialportService.openPort("/dev/ttyUSB0", 115200, 8);

  // Start listening for data
  // ...

  await app.listen(3000);
}
bootstrap();
