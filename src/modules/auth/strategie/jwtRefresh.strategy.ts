import { strategyName } from './../../../shares/constants/constants';
import { UsersService } from './../../users/users.service';
import { AUTH_REFRESH_SECRET } from '../../../shares/constants/env.constants';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, strategyName.USER_JWT_REFERSH) {
  constructor(
    private readonly userService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        let refreshToken = request?.signedCookies["refresh_token"];
        if (!refreshToken) {
          return null;
        }
        return refreshToken;
      }]),
      ignoreExpiration: false,
      secretOrKey: AUTH_REFRESH_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: any, payload: AuthJwtPayload) {
    const refreshToken = req.signedCookies["refresh_token"];

    const user = await this.userService.validateUserRefreshToken(payload.sub, refreshToken);
    if (!user) {
      throw new HttpException(
        'Invalid refresh token',
        HttpStatus.UNAUTHORIZED
      );
    }

    return user;
  }
}
