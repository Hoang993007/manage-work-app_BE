import { strategyName } from './../../../shares/constants/constants';

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AdminJwtAuthGuard extends AuthGuard(strategyName.ADMIN_JWT) {}
 