import { AUTH_REFRESH_SECRET } from './../../shares/constants/constants';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: AUTH_REFRESH_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: any, payload: AuthJwtPayload) {
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    return { email: payload.email, userId: payload.sub, username: payload.username, refreshToken };
  }
}
