import { IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetAdminByIdDto {
  @ApiProperty()
  @IsNumberString()
  readonly id: string;
}
