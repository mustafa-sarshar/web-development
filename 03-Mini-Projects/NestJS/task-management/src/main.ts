import "reflect-metadata";

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";

import { TransformInterceptor } from "./shared/interceptors/transform.interceptor";

async function bootstrap() {
  const PORT: number = parseInt(process.env["PORT"], 10) || 3000;
  const logger = new Logger("Bootstrap", { timestamp: true });
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  await app
    .listen(PORT)
    .then(() => {
      logger.log(`Server is running on port ${PORT}`);
    })
    .catch((err: any) => {
      logger.error(err.message);
    });
}
bootstrap();
