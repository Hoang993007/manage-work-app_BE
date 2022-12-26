import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpRequest = context.switchToHttp().getRequest();
    this.logger.log(`${httpRequest.method} ${httpRequest.url}`)

    const methodKey = context.getHandler().name; // "create"
    const className = context.getClass().name; // "CatsController"

    const webSocketClient = context.switchToWs().getClient();
    const webSocketData = context.switchToWs().getData();

    // const rpc = context.switchToRpc(); //microservice

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => {
          this.logger.log(`${httpRequest.method} ${httpRequest.url} --- ${Date.now() - now}ms`);
        }),
      );
  }
}
