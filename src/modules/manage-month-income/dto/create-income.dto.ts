import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class Income {
  @ApiProperty()
  @IsOptional()
  necessities?: number

  @ApiProperty()
  @IsString()
  source: string

  @ApiProperty()
  @IsString()
  description: string

  @ApiProperty()
  @IsNotEmpty()
  amount: number
}

export class CreateIncomeDto {
  @ApiProperty()
  @IsString()
  date: string

  @ApiProperty({ type: [Income] })
  @Type(() => Income)
  @ValidateNested()
  incomes: Income[]
}
