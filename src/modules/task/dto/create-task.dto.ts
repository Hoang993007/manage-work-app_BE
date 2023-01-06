import { taskPriorityEnum } from './../../../shares/constants/constants';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  date: Date

  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsString()
  description: string

  @ApiProperty()
  @IsEnum(taskPriorityEnum)
  @IsOptional()
  priority: string

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  estimateTime: number

  @ApiProperty()
  @IsString()
  note: string
}
