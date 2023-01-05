
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends Document {
  @Prop({ required: true })
  usernameOrEmail: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop(raw({
    firstName: { type: String },
    lastName: { type: String }
  }))
  details: Record<string, any>;

  @Prop()
  age: string;

  @Prop({ required: false })
  isEmailVerified: boolean;

  @Prop({ required: false })
  verifyEmailCode: string;

  @Prop({ required: false, select: false })
  refreshToken: string;

  getFullName: Function;

  // comparePassword(password: string) {
  //   if (this.password === password) return true;
  //   return false;
  // }
}

const UserSchema = SchemaFactory.createForClass(User);
UserSchema.loadClass(User); // This part here (see https://mongoosejs.com/docs/guide.html#es6-classes)

UserSchema.index({ usernameOrEmail: 1 }, { unique: true })

UserSchema.index({ age: 1 }, { unique: false })

UserSchema.methods.getFullName = function getFullName() {
  const fullname = (this.details.firstName ? this.details.firstName : '') + ' ' + (this.details.lastName ? this.details.lastName : '');
  return fullname;
}

export default UserSchema;
