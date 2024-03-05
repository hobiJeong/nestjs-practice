import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomLogger } from 'src/middlewares/custom-logger.middleware';

@Catch()
export class HttpServerErrorFilter implements ExceptionFilter {
  constructor(private readonly customLogger: CustomLogger) {}
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    const log = {
      timestamp: new Date(),
      url: req.originalUrl,
      stack: exception.stack,
    };

    if (!(exception instanceof HttpException)) {
      exception = new InternalServerErrorException();
    }

    this.customLogger.error(log);

    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(exception.getResponse());
  }
}
