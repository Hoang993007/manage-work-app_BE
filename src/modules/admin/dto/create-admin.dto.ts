import { adminRole } from '../../../shares/constants/constants';
import { IsEmail, IsEnum, IsNotEmpty, isNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail({}, {
    each: false,
    message: 'Invalid admin email',
    context: {}
  })
  email: string;

  @ApiProperty()
  @IsEnum(adminRole)
  role: string;
}
