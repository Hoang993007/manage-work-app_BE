
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  usernameOrEmail: string;

  @Prop({
    required: true,
    select: false
  })
  password: string;

  @Prop(raw({
    firstName: { type: String },
    lastName: { type: String }
  }))
  details: Record<string, any>;

  @Prop()
  age: string;

  @Prop({
    required: false
  })
  verifyEmailCode: string;
}

const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ usernameOrEmail: 1 }, { unique: true })

export default UserSchema;
