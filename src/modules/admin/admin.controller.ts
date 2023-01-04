import { AdminJwtAuthGuard } from './../auth/guard/admin.jwt-auth.guard';
import { Admin } from './schemas/admin.schema';
import { adminRoleArr, authSecurityName } from './../../shares/constants/constants';
import { AdminService } from './admin.service';
import { ApiParam, ApiTags, ApiSecurity } from '@nestjs/swagger';
import { Controller, Get, Res, Param, HttpCode, Query, UseGuards } from '@nestjs/common';
import { Roles } from 'src/shares/decorators/roles.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';

@ApiTags('Admin')
@ApiSecurity(authSecurityName.JWT_AUTH)
@UseGuards(AdminJwtAuthGuard, RolesGuard)
@Roles(adminRoleArr)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Get('/:id')
  async getAdminById(
    @Param('id') id: string,
    @Res({ passthrough: true }) response: Response
  ): Promise<Admin | null> {
    return this.adminService.getAdminById(id);
  }
}
