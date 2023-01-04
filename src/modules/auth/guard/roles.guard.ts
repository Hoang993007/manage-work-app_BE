import { AdminService } from '../../admin/admin.service';
import { appMetadataName } from '../../../shares/constants/constants';
import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
  ) { }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>(appMetadataName.ADMIN_ROLES, context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if(roles.includes(user.role)) return true;
    return false;
  }
}
