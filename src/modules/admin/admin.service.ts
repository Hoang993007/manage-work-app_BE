import { CreateAdminDto } from './dto/create-admin.dto';
import { modelName } from 'src/shares/constants/mongoModelName';
import { InjectModel } from '@nestjs/mongoose';
import { AdminDocument } from './schemas/admin.schema';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  constructor(@InjectModel(modelName.ADMIN_MODEL) private adminModel: Model<AdminDocument>){}

  async createAdmin(createAdminDto: CreateAdminDto): Promise<any> {
    let newAdmin = await new this.adminModel(createAdminDto);
    await newAdmin.save();

    return {
      ...newAdmin.toObject(),
    };
  }
}
