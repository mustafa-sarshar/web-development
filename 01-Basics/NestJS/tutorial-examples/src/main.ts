import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ValidationPipe } from "@nestjs/common";

import { AppModule } from "./app.module";
import { LoggerInterceptor } from "./shared/interceptors/logger/logger.interceptor";
import { ExcludeNullInterceptor } from "./shared/interceptors/exclude-null/exclude-null.interceptor";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalInterceptors(
    new LoggerInterceptor(),
    new ExcludeNullInterceptor(),
  );

  await app.listen(3000);
}
bootstrap();
