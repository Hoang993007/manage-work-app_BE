import { IsOptional, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class JarsSystemSetting {
  @ApiProperty()
  @IsOptional()
  necessities?: number

  @ApiProperty()
  @IsOptional()
  financialFreedom?: number

  @ApiProperty()
  @IsOptional()
  longTermSavings?: number

  @ApiProperty()
  @IsOptional()
  play?: number

  @ApiProperty()
  @IsOptional()
  tithingOrGive?: number

  @ApiProperty()
  @IsOptional()
  education?: number
}

export class CreateManageMonthIncomeDto {
  @ApiProperty()
  @Type(() => JarsSystemSetting)
  @ValidateNested()
  jarsSystemSetting: JarsSystemSetting
}
