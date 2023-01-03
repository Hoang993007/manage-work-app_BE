import { AdminService } from './../admin/admin.service';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserRegisterDto } from './../users/dto/user-register.dto';
import { AUTH_SECRET, AUTH_EXPIRES_IN, AUTH_REFRESH_SECRET, AUTH_REFRESH_EXPIRES_IN } from '../../shares/constants/env.constants';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { User, UserDocument } from '../users/schemas/user.schema';
import { Model } from 'mongoose';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) { }

  async createAdmin(createAdminDto: CreateAdminDto) {
    await this.adminService.createAdmin(createAdminDto);
  }

  async adminLogin(admin: any): Promise<any> {
    const payload: AdminAuthJwtPayload = { username: admin.usernameOrEmail, sub: admin._id.toString(), role: admin.role }
    const accessToken = await this.getAccessToken(payload);
    const refreshToken = await this.getRefreshToken(payload);

    return {
      ...admin,
      access_token: accessToken,
      refresh_token: refreshToken
    };
  }

  async userRegister(userRegisterDto: UserRegisterDto): Promise<any> {
    const newUser = await this.usersService.createNewUser(userRegisterDto);

    const payload: AuthJwtPayload = { usernameOrEmail: userRegisterDto.usernameOrEmail, sub: newUser._id.toString() }
    const accessToken = await this.getAccessToken(payload);
    const refreshToken = await this.getRefreshToken(payload);

    return {
      ...newUser.toObject(),
      access_token: accessToken,
      refresh_token: refreshToken
    };
  }

  async userLogin(user: any): Promise<any> {
    const payload: AuthJwtPayload = { usernameOrEmail: user.usernameOrEmail, sub: user.userId }
    const accessToken = await this.getAccessToken(payload);
    const refreshToken = await this.getRefreshToken(payload);

    return {
      ...user,
      access_token: accessToken,
      refresh_token: refreshToken
    };
  }

  async logout(user: any) {
    return '';
  }

  async validateAdmin(username: string, password: string, role: string): Promise<any> {
    const admin = await this.adminService.validateAdmin(username, password, role);
    return admin;
  }

  async validateUser(emailOrUsername: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUserEmailOrUserName(emailOrUsername);

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async refreshToken(userId: string, refreshToken: string): Promise<any> {
    const user = await this.usersService.findOneById(userId);

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Access Denied',
        },
        HttpStatus.UNAUTHORIZED
      );
    }

    const payload: AuthJwtPayload = { usernameOrEmail: user.usernameOrEmail, sub: userId }
    const accessToken = await this.getAccessToken(payload);
    const newRefreshToken = await this.getRefreshToken(payload);

    return {
      access_token: accessToken,
      refresh_token: newRefreshToken
    };
  }

  async getAccessToken(payload: AuthJwtPayload | AdminAuthJwtPayload) {
    const access_token = await this.jwtService.signAsync(payload, {
      secret: AUTH_SECRET,
      expiresIn: AUTH_EXPIRES_IN
    })
    return access_token;
  }

  async getRefreshToken(payload: AuthJwtPayload | AdminAuthJwtPayload) {
    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: AUTH_REFRESH_SECRET,
      expiresIn: AUTH_REFRESH_EXPIRES_IN
    })
    return refresh_token;
  }

  async argon2HashData(data: string) {
    const hash = await argon2.hash(data);
  }

  async verifyArgon2(data: string, comparedData: string) {
    return await argon2.verify(data, comparedData);
  }
}
