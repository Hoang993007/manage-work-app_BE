import { AUTH_REFRESH_SECRET } from './../../shares/constants/constants';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        let refreshToken = request?.cookies["refresh_token"];
        if (!refreshToken) {
          return null;
        }
        console.log(refreshToken)
        return refreshToken;
      }]),
      ignoreExpiration: false,
      secretOrKey: AUTH_REFRESH_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: any, payload: AuthJwtPayload) {
    const refreshToken = req.cookies["refresh_token"];
    return { email: payload.email, userId: payload.sub, username: payload.username, refreshToken };
  }
}
