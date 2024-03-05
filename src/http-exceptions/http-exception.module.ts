import { Module } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/http-exceptions/filters/http-exception.filter';
import { HttpServerErrorFilter } from 'src/http-exceptions/filters/http-server-error.filter';
import { CustomLogger } from 'src/middlewares/custom-logger.middleware';
import { LoggerModule } from 'src/middlewares/logger.module';

@Module({
  imports: [LoggerModule],
  providers: [CustomLogger, HttpServerErrorFilter, HttpExceptionFilter],
})
export class HttpExceptionModule {}
