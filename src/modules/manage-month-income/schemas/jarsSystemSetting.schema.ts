import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class JarsSystemSetting {
  @Prop({ required: true })
  necessities: number

  @Prop({ required: true })
  financialFreedom: number

  @Prop({ required: true })
  longTermSavings: number

  @Prop({ required: true })
  play: number

  @Prop({ required: true })
  tithingOrGive: number

  @Prop({ required: true })
  education: number
}

// Generate a Mongoose Schema before use as Subdocument
export const JarsSystemSettingSchema = SchemaFactory.createForClass(JarsSystemSetting);
