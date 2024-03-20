import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { CustomLogger } from 'src/middlewares/custom-logger.middleware';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly customLogger: CustomLogger) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const { method, url } = context.getArgByIndex(0);

    this.customLogger.log(`Request to ${method} ${url}`);

    return next.handle().pipe(
      tap((data) =>
        this.customLogger.log(`Response from ${method} ${url}
      response: ${JSON.stringify(data)}`),
      ),
    );
  }
}
