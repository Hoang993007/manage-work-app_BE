import { JwtAuthGuard } from './../auth/guard/jwt-auth.guard';
import { ApiTags, ApiSecurity } from '@nestjs/swagger';
import { Controller, Get, UseGuards, Request, Post } from '@nestjs/common';

@ApiTags('User')
@Controller('users')
export class UsersController {
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('JWTAuth')
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
