import { modelName } from 'src/shares/constants/mongoModelName';
import { AdminService } from './admin.service';
import AdminSchema, { Admin } from './schemas/admin.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: modelName.ADMIN_MODEL, schema: AdminSchema }])
  ],
  providers: [AdminService],
  exports: [
    AdminService,
    MongooseModule
  ]
})
export class AdminModule { }
