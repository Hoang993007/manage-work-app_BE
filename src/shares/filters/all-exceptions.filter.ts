import { errorNameType } from './../constants/constants';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    console.log(exception)

    if (host.getType() === 'http') {
      const ctx = host.switchToHttp();
      const request = ctx.getRequest<Request>();
      const response = ctx.getResponse<Response>();
      const next = ctx.getNext<any>()

      const httpStatus =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;

      const exceptionResponse: any =
        exception instanceof HttpException
          ? exception.getResponse()
          : undefined;

      const responseBody: any = {
        statusCode: httpStatus,
        timestamp: new Date().toISOString(),
        path: httpAdapter.getRequestUrl(ctx.getRequest()),
        message: exceptionResponse?.message || (exception as any).message,
      };

      if (exception instanceof Error) {
        if ((exception as Error).name === errorNameType.MONGO_SERVER_ERROR) {
          delete responseBody.message;

          responseBody.error = {
            errorType: (exception as Error).name,
            message: (exception as Error).message,
            code: (exception as any).code
          }
        }
      }

      httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    } else if (host.getType() === 'rpc') {
      const ctx = host.switchToRpc(); //microservice
    }
    // else if (host.getType<GqlContextType>() === 'graphql') {
    //   // do something that is only important in the context of GraphQL requests
    // }

    // ctx = host.switchToWs().getClient();
  }
}
