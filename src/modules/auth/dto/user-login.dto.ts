import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @ApiProperty()
  usernameOrEmail: string;

  @ApiProperty()
  password: string;
}
