import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtRefreshGuard } from './guard/jwt-refresh.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { Controller, Post, UseGuards, Request, Get, Req, Param } from '@nestjs/common';
import { ApiBody, ApiParam, ApiSecurity, ApiTags } from '@nestjs/swagger';

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
  async login(@Request() req: any) {
    const res = this.authService.login(req.user)
    return res;
  }

  @ApiSecurity('JWTAuth')
  @UseGuards(JwtRefreshGuard)
  @Get('refresh-access-token')
  refreshTokens(@Req() req: any) {
    const userId = req.user.userId;
    const refreshToken = req.user.refreshToken;
    return this.authService.refreshToken(userId, refreshToken);
  }

  @ApiSecurity('JWTAuth')
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Request() req: any) {
    const res = this.authService.logout(req.user);
    return res;
  }
}
