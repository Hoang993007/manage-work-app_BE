import { UsersService } from './../../users/users.service';
import { adminRoleEnum, strategyName } from './../../../shares/constants/constants';

import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, strategyName.USER_LOCAL) {
  constructor(
    private readonly userService: UsersService
  ) {
    super({
      usernameField: 'emailOrUsername',
    });
  }

  async validate(emailOrUsername: string, password: string): Promise<any> {
    const user = await this.userService.validateUser(emailOrUsername, password);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Username/email or password is not correct',
        },
        HttpStatus.UNAUTHORIZED
      );
    }

    return user;
  }
}
