import { User, UserDocument } from './schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { modelName } from 'src/shares/constants/mongoModelName';
import { UserRegisterDto } from './dto/user-register.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(modelName.USER_MODEL) private userModel: Model<UserDocument>) { }

  async createNewUser(userRegisterDto: UserRegisterDto): Promise<UserDocument> {
    const createdUser = new this.userModel(userRegisterDto);
    return await createdUser.save();
  }

  async getUsers() {
    const users = await this.userModel.find().lean();
    return users;
  }

  // async findAll(): Promise<Cat[]> {
  //   return this.catModel.find().exec();
  // }

  async findOneByUserEmailOrUserName(emailOrUsername: string): Promise<User> {
    return this.userModel.findOne({ emailOrUsername }).lean();
    // user => (user.username === emailOrUsername || user.email === emailOrUsername)
  }

  async findOneById(userId: string): Promise<User | null> {
    return this.userModel.findById(userId);
  }
}
