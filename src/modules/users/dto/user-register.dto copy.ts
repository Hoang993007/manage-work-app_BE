import { ApiProperty } from '@nestjs/swagger';

export class UserRegisterDto {
  @ApiProperty()
  usernameOrEmail: string;

  @ApiProperty()
  password: string;
}
