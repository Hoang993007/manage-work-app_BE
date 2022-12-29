import { adminRole } from '../../../shares/constants/constants';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdminDocument = HydratedDocument<Admin>;

@Schema()
export class Admin {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({
    required: true,
    select: false
  })
  password: string;

  @Prop({
    type: String,
    required: true,
    enum: [adminRole.ADMIN, adminRole.SUPER_ADMIN],
    default: adminRole.ADMIN,
  })
  role: string;

  @Prop(raw({
    firstName: { type: String },
    lastName: { type: String }
  }))
  details: Record<string, any>;

  @Prop()
  age: string;
}

const AdminSchema = SchemaFactory.createForClass(Admin);
AdminSchema.index({ username: 1 }, { unique: true })

export default AdminSchema;
