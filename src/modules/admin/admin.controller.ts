import { GetAdminByIdDto } from './dto/get-admin-by-id.dto';
import { adminRole } from '../../shares/constants/constants';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { ApiTags, ApiSecurity, ApiBody } from '@nestjs/swagger';
import { Controller, UseGuards, Get, Post, Body, Res, Param, HttpCode } from '@nestjs/common';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @ApiBody({
    type: CreateAdminDto,
    description: "create admin body",
    examples: {
      user1: {
        summary: "user example 1",
        value: {
          username: 'admin',
          password: '1234567',
          email: 'test@gmail.com',
          role: adminRole.SUPER_ADMIN
        } as CreateAdminDto
      },
    }
  })
  @Post('/')
  async register(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) response: Response
  ) {
    console.log(createAdminDto)
    const res = await this.adminService.createAdmin(createAdminDto);
    return res;
  }

  @Get('/:id')
  @HttpCode(201)
  async getAdminById(
    @Param() id: GetAdminByIdDto,
    @Res({ passthrough: true }) response: Response
  ) {
    return 'ok';
  }
}
