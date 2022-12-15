import { JwtRefreshGuard } from './guard/jwt-refresh.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { Controller, Post, UseGuards, Get, Req, Res } from '@nestjs/common';
import { ApiBody, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @ApiBody({
    type: UserLoginDto,
    description: "Login body",
    examples: {
      user1: {
        summary: "user example 1",
        value: {
          emailOrUsername: 'john',
          password: 'changeme'
        } as UserLoginDto
      },
    }
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    const res = await this.authService.login(req.user);
    response.cookie('refresh_token', res.refresh_token, { httpOnly: true });
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
    response.cookie('refresh_token', res.refresh_token, { httpOnly: true });
    delete res.refresh_token;

    return res;
  }

  @ApiSecurity('JWTAuth')
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req: Request) {
    const res = this.authService.logout(req.user);
    return res;
  }
}
