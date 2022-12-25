import { UserDocument } from './schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { modelName } from 'src/shares/constants/mongoModelName';
import { UserRegisterDto } from './dto/user-register.dto';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(@InjectModel(modelName.USER_MODEL) private userModel: Model<UserDocument>) { }

  async userRegister(userRegisterDto: UserRegisterDto): Promise<User> {
    const createdUser = new this.userModel(userRegisterDto);
    return createdUser.save();
  }

  async findOne(emailOrUsername: string): Promise<User> {
    return this.userModel.find();
    // user => (user.username === emailOrUsername || user.email === emailOrUsername)
  }

  async findOneById(userId: number): Promise<User> {
    return this.userModel.find();
    // user => (user.userId === userId)
  }
}
