import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { CustomLogger } from 'src/middlewares/custom-logger.middleware';

@Module({
  providers: [
    CustomLogger,
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
  ],
  exports: [CustomLogger],
})
export class LoggerModule {}
