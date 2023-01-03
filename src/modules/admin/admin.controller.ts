import { Admin } from './schemas/admin.schema';
import { adminRoleArr } from './../../shares/constants/constants';
import { Roles } from './../../shares/decorators/test.decorator';
import { AdminService } from './admin.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Res, Param, HttpCode, Query } from '@nestjs/common';

@ApiTags('Admin')
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
