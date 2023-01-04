import { AdminJwtAuthGuard } from './guard/admin.jwt-auth.guard';
import { AdminLocalAuthGuard } from './guard/admin.local-auth.guard';
import { adminRole } from './../../shares/constants/constants';
import { CreateAdminDto } from './../admin/dto/create-admin.dto';
import { apibody_userRegister, apibody_userLogin, apibody_adminLogin, apibody_createAdmin } from './api-body.swagger';
import { authSecurityName } from '../../shares/constants/constants';
import { UserRegisterDto } from './../users/dto/user-register.dto';
import { JwtRefreshGuard } from './guard/jwt-refresh.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { Controller, Post, UseGuards, Get, Req, Res, Body } from '@nestjs/common';
import { ApiBody, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Roles } from 'src/shares/decorators/roles.decorator';
import { RolesGuard } from './guard/roles.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @ApiSecurity(authSecurityName.JWT_AUTH)
  @UseGuards(AdminJwtAuthGuard, RolesGuard)
  @Roles(adminRole.SUPER_ADMIN)
  @ApiBody(apibody_createAdmin)
  @Post('/admin/create')
  async createAdmin(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const res = await this.authService.createAdmin(createAdminDto);
    return res;
  }

  @ApiBody(apibody_adminLogin)
  @UseGuards(AdminLocalAuthGuard)
  @Post('admin/login')
  async adminLogin(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    const admin: any = req.user;
    const res = await this.authService.adminLogin(admin);
    return res;
  }

  @ApiBody(apibody_userRegister)
  @Post('user/register')
  async register(
    @Body() userRegisterDto: UserRegisterDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const res = await this.authService.userRegister(userRegisterDto);

    response.cookie('refresh_token', res.refresh_token, {
      signed: true,
      httpOnly: true,
      secure: true
    });
    delete res.refresh_token;

    return res;
  }

  @ApiSecurity(authSecurityName.BASIC_AUTH)
  @ApiBody(apibody_userLogin)
  @UseGuards(LocalAuthGuard)
  @Post('user/login')
  async login(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    const user: any = req.user;
    const res = await this.authService.userLogin(req.user);

    await user.updateOne({ refreshToken: res.refresh_token })

    response.cookie('refresh_token', res.refresh_token, {
      signed: true,
      httpOnly: true,
      secure: true
    });
    delete res.refresh_token;

    return res;
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh-access-token')
  async refreshTokens(
    @Req() req: any,
    @Res({ passthrough: true }) response: Response
  ) {
    const user = req.user;
    const res = await this.authService.refreshToken(user);

    await user.updateOne({ refreshToken: res.refresh_token })

    response.cookie('refresh_token', res.refresh_token, {
      signed: true,
      httpOnly: true,
      secure: true
    });
    delete res.refresh_token;

    return res;
  }

  @ApiSecurity(authSecurityName.JWT_AUTH)
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req: Request) {
    const res = this.authService.logout(req.user);
    return res;
  }
}
