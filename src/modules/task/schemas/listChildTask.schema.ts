import { dayOfWeekEnum } from '../../../shares/constants/constants';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class ListChildTask {
  @Prop({ required: true })
  dayOfWeek: string

  @Prop({ required: false })
  description: string

  @Prop({
    required: true,
    type: Boolean,
    default: false
  })
  status: boolean
}

// Generate a Mongoose Schema before use as Subdocument
export const ListChildTaskSchema = SchemaFactory.createForClass(ListChildTask);
