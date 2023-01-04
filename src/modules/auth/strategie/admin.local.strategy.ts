import { strategyName } from './../../../shares/constants/constants';
import { AdminService } from './../../admin/admin.service';

import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { adminRoleArr } from '../../../shares/constants/constants';
import { AuthService } from '../auth.service';

@Injectable()
export class AdminLocalStrategy extends PassportStrategy(Strategy, strategyName.LOCAL_ADMIN) {
  constructor(private adminService: AdminService) {
    super({
      passReqToCallback: true
    });
  }

  async validate(req: any, username: string, password: string): Promise<any> {
    const role = req.body.role;
    if (!adminRoleArr.includes(role)) {
      throw new HttpException('No role exists', HttpStatus.BAD_REQUEST);
    }

    const admin = await this.adminService.validateAdmin(username, password, role);

    if (!admin) {
      throw new HttpException(
        'Username/email or password is not correct',
        HttpStatus.UNAUTHORIZED
      );
    }

    return admin;
  }
}
