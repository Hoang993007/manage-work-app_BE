
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const SignedCookies = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return data ? request.signedCookies?.[data] : request.signedCookies;
  },
);
