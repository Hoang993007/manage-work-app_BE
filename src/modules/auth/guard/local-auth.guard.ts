import { strategyName } from './../../../shares/constants/constants';

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard(strategyName.USER_LOCAL) {}
