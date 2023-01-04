import { AdminJwtStrategy } from './strategie/admin.jwt.strategy';
import { AdminLocalStrategy } from './strategie/admin.local.strategy';
import { AdminModule } from './../admin/admin.module';
import { JwtRefreshStrategy } from './strategie/jwtRefresh.strategy';
import { JwtStrategy } from './strategie/jwt.strategy';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategie/local.strategy'; 
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guard/roles.guard';

@Module({
  imports: [
    UsersModule, 
    AdminModule,
    PassportModule,
    JwtModule,
  ],
  providers: [
    AuthService, 
    LocalStrategy, 
    AdminLocalStrategy,
    JwtStrategy, 
    AdminJwtStrategy,
    JwtRefreshStrategy,
  ],
  controllers: [AuthController]
})
export class AuthModule {}
