import { taskPriority, taskPriorityEnum } from './../../../shares/constants/constants';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ListChildTask, ListChildTaskSchema } from './listChildTask.schema';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop({ required: true })
  name: string

  @Prop({ required: false })
  description: string

  @Prop({
    required: true,
    type: String,
    enum: taskPriorityEnum,
    default: taskPriority.NEITHER
  })
  priority: string

  // unit: hour
  @Prop({
    required: true,
    default: 0
  })
  estimateTime: number

  @Prop({ required: false })
  note: string

  @Prop({ type: [ListChildTaskSchema] })
  listChildTask: ListChildTask[]

  @Prop({ required: false })
  subTasks: this[]
}

const TaskSchema = SchemaFactory.createForClass(Task);
TaskSchema.index({ priority: 1 }, { unique: false });

export default TaskSchema;
