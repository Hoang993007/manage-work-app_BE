import { authSecurityName } from './../../shares/constants/constants';
import { UserRegisterDto } from './../users/dto/user-register.dto';
import { JwtRefreshGuard } from './guard/jwt-refresh.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { Controller, Post, UseGuards, Get, Req, Res, Body } from '@nestjs/common';
import { ApiBody, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @ApiBody({
    type: UserRegisterDto,
    description: "User register body",
    examples: {
      user1: {
        summary: "user example 1",
        value: {
          emailOrUsername: 'hoang',
          password: '1234567'
        } as UserRegisterDto
      },
    }
  })
  @Post('register')
  async register(
    @Body() userRegisterDto: UserRegisterDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const res = await this.authService.register(userRegisterDto);
    response.cookie('refresh_token', res.refresh_token, {
      signed: true,
      httpOnly: true,
      secure: true
    });
    delete res.refresh_token;

    return res;
  }

  @ApiBody({
    type: UserLoginDto,
    description: "Login body",
    examples: {
      user1: {
        summary: "user example 1",
        value: {
          emailOrUsername: 'hoang',
          password: '1234567'
        } as UserLoginDto
      },
    }
  })
  @ApiSecurity(authSecurityName.BASIC_AUTH)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    const res = await this.authService.login(req.user);
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
    const userId = req.user.userId;
    const refreshToken = req.user.refreshToken;
    const res = await this.authService.refreshToken(userId, refreshToken);
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
