import {
  BadGatewayException,
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';
import { Response } from 'src/interceptors/transform.interceptor';

export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle();
    // .pipe(catchError((err) => throwError(() => new BadGatewayException())));
  }
}
