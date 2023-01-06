import { taskPriorityEnum } from './../../../shares/constants/constants';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetTasksDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  limit: number

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  offset: number

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  search: string

  @ApiProperty({ required: false })
  @IsOptional()
  priorities: string
}
