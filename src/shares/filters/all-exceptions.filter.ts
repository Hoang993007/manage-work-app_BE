import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    //retrieve the array of arguments being passed to the handler
    // const [req, res, next] = host.getArgs();
    // const request = host.getArgByIndex(0);


    let ctx;
    if (host.getType() === 'http') {
      ctx = host.switchToHttp();
      const request = ctx.getRequest<Request>();
      const response = ctx.getResponse<Response>();

      const httpStatus =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;

      const responseBody = {
        statusCode: httpStatus,
        timestamp: new Date().toISOString(),
        path: httpAdapter.getRequestUrl(ctx.getRequest()),
      };

      httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    } else if (host.getType() === 'rpc') {
      ctx = host.switchToRpc(); //microservice
    }
    // else if (host.getType<GqlContextType>() === 'graphql') {
    //   // do something that is only important in the context of GraphQL requests
    // }

    // ctx = host.switchToWs().getClient();
  }
}
