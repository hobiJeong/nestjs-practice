import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggerTwoMiddleware } from './middlewares/logger-two.middleware';
import { config } from 'dotenv';
import { CustomLogger } from 'src/middlewares/custom-logger.middleware';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger:
      process.env.NODE_ENV === 'production'
        ? ['error', 'warn', 'log']
        : ['error', 'warn', 'log', 'verbose', 'debug'],
  });

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
