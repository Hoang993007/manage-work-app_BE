import { AdminService } from './../../admin/admin.service';
import { strategyName } from './../../../shares/constants/constants';
import { AUTH_SECRET } from '../../../shares/constants/env.constants';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, strategyName.ADMIN_JWT) {
  constructor(
    private readonly adminService: AdminService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: AUTH_SECRET,
    });
  }

  async validate(payload: AuthJwtPayload) {
    const admin = await this.adminService.getAdminById(payload.sub);
    if(!admin) {
      throw new HttpException(
        'Invalid jwt token',
        HttpStatus.UNAUTHORIZED
      );
    }

    return admin;
  }
}
