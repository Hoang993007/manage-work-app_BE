import { modelName } from 'src/shares/constants/mongoModelName';
import { ManageMonthIncomeService } from './manage-month-income.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ManageMonthIncomeController } from './manage-month-income.controller';
import ManageMonthIncomeSchema, { ManageMonthIncome } from './schemas/manageMonthIncome.schema';
import IncomeCategorySchema from './schemas/incomeCategory.schema';

@Module({
  controllers: [ManageMonthIncomeController],
  imports: [
    MongooseModule.forFeature([
      { name: modelName.MANAGE_MONTH_INCOME_MODEL, schema: ManageMonthIncomeSchema },
      { name: modelName.INCOME_CATEGORY_MODEL, schema: IncomeCategorySchema }
    ])
  ],
  providers: [ManageMonthIncomeService],
  exports: [
    ManageMonthIncomeService,
    MongooseModule
  ]
})
export class ManageMonthIncomeModule { }
