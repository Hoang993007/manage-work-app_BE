import { CreateIncomeDto } from './dto/create-income.dto';
import { convertMonthNumToName, convertDayOfWeekNumToDayOfWeekName } from './../../shares/utils/utils';
import { modelName } from 'src/shares/constants/mongoModelName';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateManageMonthIncomeDto, JarsSystemSetting } from './dto/create-manage-month-income.dto';
import { Model } from 'mongoose';
import { ManageMonthIncomeDocument } from './schemas/manageMonthIncome.schema';
import { IncomeCategoryDocument } from './schemas/incomeCategory.schema';

@Injectable()
export class ManageMonthIncomeService {
  constructor(
    @InjectModel(modelName.MANAGE_MONTH_INCOME_MODEL) private manageMOnthIncomeModel: Model<ManageMonthIncomeDocument>,
    @InjectModel(modelName.INCOME_CATEGORY) private incomeCategoryModel: Model<IncomeCategoryDocument>
  ) { }

  async createNewManageMonthIncome(createManageMonthIncomeDto: CreateManageMonthIncomeDto) {
    const jarsSystemSetting = this.getJarsSystemSetting(createManageMonthIncomeDto.jarsSystemSetting);
    const newManageMonthIncome = new this.manageMOnthIncomeModel({
      month: convertMonthNumToName(Number(new Date().getMonth().toLocaleString()) + 1),
      year: Number(new Date().getFullYear().toLocaleString().replace(',', '')),
      jarsSystemSetting
    });
    await newManageMonthIncome.save();

    return newManageMonthIncome;
  }

  getJarsSystemSetting(jarsSystemSetting: JarsSystemSetting) {
    return {
      necessities: jarsSystemSetting.necessities || 55,
      financialFreedom: jarsSystemSetting.financialFreedom || 10,
      longTermSavings: jarsSystemSetting.longTermSavings || 10,
      play: jarsSystemSetting.play || 10,
      tithingOrGive: jarsSystemSetting.tithingOrGive || 10,
      education: jarsSystemSetting.education || 5,
    }
  }

  async createNewIncome(createIncomeDto: CreateIncomeDto) {
    const [month, day, year] = createIncomeDto.date.split('/').map(el => Number(el));
    const manageMonthIncome = await this.findManageMonthIncome(month, year);

    if (!manageMonthIncome) {
      throw new HttpException(
        'wrong date',
        HttpStatus.BAD_REQUEST
      )
    }

    createIncomeDto.incomes.map(income => {
      manageMonthIncome?.incomes.push({
        dayOfWeek: convertDayOfWeekNumToDayOfWeekName(new Date(createIncomeDto.date).getDay().toLocaleString()),
        day,
        ...income
      })
    })

    await manageMonthIncome.save();
  }

  async createNewIncomeCategory() {

  }

  async findManageMonthIncome(month: number | string, year: number) {
    return await this.manageMOnthIncomeModel.findOne({
      month: typeof month === 'string' ? month : convertMonthNumToName(month),
      year
    })
  }
}
