import { JwtRefreshStrategy } from './strategie/jwtRefresh.strategy';
import { JwtStrategy } from './strategie/jwt.strategy';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategie/local.strategy'; 
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule, 
    PassportModule,
    JwtModule
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
