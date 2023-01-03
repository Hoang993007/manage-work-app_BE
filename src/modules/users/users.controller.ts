import { adminRoleArr } from './../../shares/constants/constants';
import { adminRole } from '../../shares/constants/constants';
import { Roles } from './../../shares/decorators/test.decorator';
import { UsersService } from './users.service';
import { JwtAuthGuard } from './../auth/guard/jwt-auth.guard';
import { ApiTags, ApiSecurity } from '@nestjs/swagger';
import { Controller, Get, UseGuards, Request, Post } from '@nestjs/common';
import { RolesGuard } from 'src/shares/guards/roles.guard';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @Roles(adminRoleArr)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/')
  getUsers(@Request() req: any) {
    return this.userService.getUsers();
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('JWTAuth')
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
