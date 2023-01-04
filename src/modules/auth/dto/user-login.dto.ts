import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @ApiProperty()
  emailOrUsername: string;

  @ApiProperty()
  password: string;
}
