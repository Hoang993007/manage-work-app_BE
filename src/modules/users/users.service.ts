import { compareBcrypt } from './../../shares/utils/utils';
import { User, UserDocument } from './schemas/user.schema';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { modelName } from 'src/shares/constants/mongoModelName';
import { UserRegisterDto } from './dto/user-register.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(modelName.USER_MODEL) private userModel: Model<UserDocument>) { }

  async validateUser(emailOrUsername: string, password: string): Promise<any> {
    const user = await this.findOneByUserEmailOrUserNameWithPassword(emailOrUsername);
    if (!user) return user;

    // if (await (user as any).comparePassword(password)) {
    //   return user;
    // }

    if (await compareBcrypt(password, user.password)) {
      user.set('password', undefined, { strict: false })
      return user;
    }

    return null;
  }

  async validateUserRefreshToken(userId: string, refreshToken: string) {
    const user = await this.userModel.findById(userId).select('+refreshToken');
    if (!user) return user;

    if (refreshToken === user.refreshToken) {
      user.set('refreshToken', undefined, { strict: false })
      return user;
    }

    return null;
  }

  async createNewUser(userRegisterDto: UserRegisterDto): Promise<UserDocument> {
    const createdUser = new this.userModel(userRegisterDto);
    return await createdUser.save();
  }

  async getUsers() {
    return this.userModel.find();
  }

  async getUserProfile(user: any) {
    return user.getFullName()
  }

  // async findAll(): Promise<Cat[]> {
  //   return this.catModel.find().exec();
  // }

  async findOneByUserEmailOrUserNameWithPassword(emailOrUsername: string): Promise<any> {
    const user = this.userModel.findOne({ emailOrUsername }).select('+password');
    return user;
  }

  async findOneByUserEmailOrUserNameLeaned(emailOrUsername: string): Promise<any> {
    const user = this.userModel.findOne({ emailOrUsername }).lean();
    return user;
  }

  async findUserById(id: string): Promise<any> {
    if (!mongoose.isValidObjectId(id)) {
      throw new HttpException('Not valid id', HttpStatus.BAD_REQUEST)
    }

    return this.userModel.findById(id);
  }
}
