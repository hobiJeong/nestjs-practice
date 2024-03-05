import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomLogger } from 'src/middlewares/custom-logger.middleware';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly customLogger: CustomLogger) {}
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    if (!(exception instanceof HttpException)) {
      exception = new InternalServerErrorException();
    }

    const response = (exception as HttpException).getResponse();

    const log = {
      timestamp: new Date(),
      url: req.url,
      response,
      stack: exception.stack,
    };

    this.customLogger.error(log);

    res.status((exception as HttpException).getStatus()).json(response);
  }
}
