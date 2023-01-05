import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateIncomeCategoryDto {
  @ApiProperty()
  @IsString()
  name: string
}
