import { HttpAdapterHost } from '@nestjs/core';
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ResponseFormat<T> {
  statusCode: HttpStatus,
  timestamp: string,
  path: string,
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ResponseFormat<T>> {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseFormat<T>> {
    const { httpAdapter } = this.httpAdapterHost;

    const httpCtx = context.switchToHttp();
    const now = Date.now();

    return next
      .handle()
      .pipe(map((value, index) => {
        return {
          statusCode: httpCtx.getResponse().statusCode,
          timestamp: new Date().toISOString(),
          responseTIme: `${Date.now() - now} ms`,
          path: httpAdapter.getRequestUrl(httpCtx.getRequest()),
          data: value
        }
      }));
  }
}
