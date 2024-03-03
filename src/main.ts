import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggerTwoMiddleware } from './middlewares/logger-two.middleware';
import { config } from 'dotenv';
import { CustomLogger } from 'src/middlewares/custom-logger.middleware';
import {
  WINSTON_MODULE_NEST_PROVIDER,
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import * as winston from 'winston';

config();

async function bootstrap() {
  // const app = await NestFactory.create(AppModule, {
  //   logger:
  //     process.env.NODE_ENV === 'production'
  //       ? ['error', 'warn', 'log']
  //       : ['error', 'warn', 'log', 'verbose', 'debug'],
  // });

  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike('NestJSPractice', {
              prettyPrint: true,
            }),
          ),
        }),
      ],
    }),
  });

  const appService = app.get<AppService>(AppService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  appService.getHello();

  const port = appService.getPort();

  await app.listen(port);
}
bootstrap();
