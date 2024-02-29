import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggerTwoMiddleware } from './middlewares/logger-two.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appService = app.get<AppService>(AppService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.use(LoggerTwoMiddleware);
  appService.getHello();

  const port = appService.getPort();

  await app.listen(port);
}
bootstrap();
