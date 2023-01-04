import { adminRoleArr, authSecurityName } from './../../shares/constants/constants';
import { UsersService } from './users.service';
import { JwtAuthGuard } from './../auth/guard/jwt-auth.guard';
import { ApiTags, ApiSecurity } from '@nestjs/swagger';
import { Controller, Get, UseGuards, Req, Post, Res } from '@nestjs/common';
import { RolesGuard } from '../auth/guard/roles.guard';
import { User } from './schemas/user.schema';
import { AdminJwtAuthGuard } from '../auth/guard/admin.jwt-auth.guard';
import { Roles } from 'src/shares/decorators/roles.decorator';
import { Request } from 'express';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @ApiSecurity(authSecurityName.JWT_AUTH)
  @Roles(adminRoleArr)
  @UseGuards(AdminJwtAuthGuard, RolesGuard)
  @Get('/')
  async getUsers(@Req() req: any) {
    const user = await this.userService.getUsers();
    return user;
  }

  @ApiSecurity(authSecurityName.JWT_AUTH)
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    const user: any = req.user;
    if (!user) return null;

    const userFullname = await user.getFullName();
    user.set('details', undefined, { strict: false });

    // return { ...user } // will return mongoose document
    // return { data: user } // only return user object
    // return user; // only return user object

    return {
      ...user.toObject(),
      fullname: userFullname
    }
  }
}
