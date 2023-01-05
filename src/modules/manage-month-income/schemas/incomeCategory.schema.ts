import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type IncomeCategoryDocument = HydratedDocument<IncomeCategory>;

@Schema()
export class IncomeCategory {
  @Prop({ require: true })
  name: string

  @Prop({ required: false })
  subCategory: this[]
}

const IncomeCategorySchema = SchemaFactory.createForClass(IncomeCategory);
IncomeCategorySchema.index({ name: 1 }, { unique: true });

export default IncomeCategorySchema;
