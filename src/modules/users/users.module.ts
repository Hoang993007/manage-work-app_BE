import UserSchema, { User } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]) // register user model
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService, MongooseModule]
})
export class UsersModule { }
