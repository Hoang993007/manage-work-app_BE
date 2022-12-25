import { ApiProperty } from '@nestjs/swagger';

export class UserRegisterDto {
  @ApiProperty()
  emailOrUsername: string;

  @ApiProperty()
  password: string;
}
