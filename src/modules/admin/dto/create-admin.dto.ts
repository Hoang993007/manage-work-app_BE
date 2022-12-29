import { adminRole } from '../../../shares/constants/constants';
import { IsEmail, IsEnum, IsNotEmpty, isNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail({}, {
    each: false,
    message: 'Invalid admin email',
    context: {}
  })
  readonly email: string;

  @ApiProperty()
  @IsEnum(adminRole)
  readonly role: string;
}
