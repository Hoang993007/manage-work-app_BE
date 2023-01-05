import { CreateIncomeCategoryDto } from './dto/create-income-categroy.dto';
import { CreateIncomeDto } from './dto/create-income.dto';
import { ManageMonthIncomeService } from './manage-month-income.service';
import { apibody_createManageMonthIncome, apibody_createIncome } from './api-body.swagger';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { Controller, Post, Body, Res } from '@nestjs/common';
import { CreateManageMonthIncomeDto } from './dto/create-manage-month-income.dto';

@ApiTags('Manage month income')
@Controller('manage-month-income')
export class ManageMonthIncomeController {
  constructor(
    private readonly manageMonthIncomeService: ManageMonthIncomeService
  ){}

  @ApiBody(apibody_createManageMonthIncome)
  @Post()
  async createNewManageMonthIncome(
    @Body() createManageMonthIncomeDto: CreateManageMonthIncomeDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<any> {
    return this.manageMonthIncomeService.createNewManageMonthIncome(createManageMonthIncomeDto);
  }

  @ApiBody(apibody_createIncome)
  @Post('/income')
  async createIncome(
    @Body() createIncomeDto: CreateIncomeDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<any> {
    return this.manageMonthIncomeService.createNewIncome(createIncomeDto)
  }

  @Post('/income-category')
  async createIncomeCategory(
    @Body() createIncomeCategoryDto: CreateIncomeCategoryDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<any> {
  }
}
