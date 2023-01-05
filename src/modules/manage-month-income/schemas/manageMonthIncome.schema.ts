import { JarsSystemSetting, JarsSystemSettingSchema } from './jarsSystemSetting.schema';
import { monthOfYearEnum } from '../../../shares/constants/constants';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Income, IncomeSchema } from './income.schema';

export type ManageMonthIncomeDocument = HydratedDocument<ManageMonthIncome>;

@Schema()
export class ManageMonthIncome {
  @Prop({
    required: true,
    type: String,
    enum: monthOfYearEnum
  })
  month: string

  @Prop({ required: true })
  year: number

  @Prop({
    type: JarsSystemSettingSchema,
    required: true
  })
  jarsSystemSetting: JarsSystemSetting

  @Prop({ type: [IncomeSchema] })
  incomes: Income[]
}

const ManageMonthIncomeSchema = SchemaFactory.createForClass(ManageMonthIncome);
ManageMonthIncomeSchema.index({ month: 1, year: 1 }, { unique: true });

export default ManageMonthIncomeSchema;
