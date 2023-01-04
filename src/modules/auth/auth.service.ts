import { AdminService } from './../admin/admin.service';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { UserRegisterDto } from './../users/dto/user-register.dto';
import { AUTH_SECRET, AUTH_EXPIRES_IN, AUTH_REFRESH_SECRET, AUTH_REFRESH_EXPIRES_IN } from '../../shares/constants/env.constants';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import bcrypt from 'bcrypt';
import { encryptText } from 'src/shares/utils/utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) { }

  async createAdmin(createAdminDto: CreateAdminDto) {
    createAdminDto.password = await encryptText(createAdminDto.password);
    await this.adminService.createAdmin(createAdminDto);
  }

  async adminLogin(admin: any): Promise<any> {
    const payload: AdminAuthJwtPayload = { username: admin.usernameOrEmail, sub: admin._id.toString(), role: admin.role }
    const accessToken = await this.getAccessToken(payload);

    return {
      ...admin.toObject(),
      access_token: accessToken,
    };
  }

  async userRegister(userRegisterDto: UserRegisterDto): Promise<any> {
    userRegisterDto.password = await encryptText(userRegisterDto.password);
    const newUser = await this.usersService.createNewUser(userRegisterDto);

    const payload: AuthJwtPayload = { usernameOrEmail: userRegisterDto.usernameOrEmail, sub: newUser._id.toString() }
    const accessToken = await this.getAccessToken(payload);
    const refreshToken = await this.getRefreshToken(payload);

    await newUser.updateOne({ refreshToken })

    return {
      ...newUser.toObject(),
      access_token: accessToken,
      refresh_token: refreshToken
    };
  }

  async userLogin(user: any): Promise<any> {
    const payload: AuthJwtPayload = { usernameOrEmail: user.usernameOrEmail, sub: user._id.toString() }
    const accessToken = await this.getAccessToken(payload);
    const refreshToken = await this.getRefreshToken(payload);

    return {
      ...user.toObject(),
      access_token: accessToken,
      refresh_token: refreshToken
    };
  }

  async logout(user: any) {
    return '';
  }

  async refreshToken(user: any): Promise<any> {
    const payload: AuthJwtPayload = { usernameOrEmail: user.usernameOrEmail, sub: user._id.toString() }
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
