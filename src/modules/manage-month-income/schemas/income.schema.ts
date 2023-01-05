import { dayOfWeekEnum } from './../../../shares/constants/constants';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Income {
  @Prop({
    required: true,
    type: String,
    enum: dayOfWeekEnum,
  })
  dayOfWeek: string

  @Prop({ required: true })
  day: number

  @Prop({ required: true })
  source: string

  @Prop({ required: false })
  description: string

  @Prop({ required: true })
  amount: number
}

// Generate a Mongoose Schema before use as Subdocument
export const IncomeSchema = SchemaFactory.createForClass(Income);
