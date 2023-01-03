import { CreateAdminDto } from './dto/create-admin.dto';
import { modelName } from 'src/shares/constants/mongoModelName';
import { InjectModel } from '@nestjs/mongoose';
import { Admin, AdminDocument } from './schemas/admin.schema';
import mongoose, { Model } from 'mongoose';
import { Injectable, HttpException, HttpCode, HttpStatus } from '@nestjs/common';

@Injectable()
export class AdminService {
  constructor(@InjectModel(modelName.ADMIN_MODEL) private adminModel: Model<AdminDocument>) { }

  async createAdmin(createAdminDto: CreateAdminDto): Promise<Admin> {
    let newAdmin = await new this.adminModel(createAdminDto);
    await newAdmin.save();

    return newAdmin.toObject();
  }

  async getAdminById(id: string): Promise<Admin | null> {
    if (!mongoose.isValidObjectId(id)) {
      throw new HttpException('Not valid id', HttpStatus.BAD_REQUEST)
    }

    const admin = await this.adminModel.findOne({ _id: id }, {});
    return admin;
  }

  async validateAdmin(username: string, password: string, role: string): Promise<any> {
    const admin = await this.adminModel.findOne({
      username,
      password,
      role
    }).select('+password');

    if (!admin) return null;

    return admin.toObject();
  }

  // async upatePassword () {
  //   const admin = await this.adminModel.findOne({
  //     username,
  //     role
  //   }).select('+password');
  // }
}
