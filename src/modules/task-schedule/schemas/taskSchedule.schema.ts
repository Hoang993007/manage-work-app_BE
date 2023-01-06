import { Task } from '../../task/schemas/task.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import TaskSchema from 'src/modules/task/schemas/task.schema';

export type TaskDocument = HydratedDocument<TaskSchedule>;

@Schema()
export class TaskSchedule {
  @Prop({ require: true })
  date: Date

  @Prop({ type: [TaskSchema] })
  tasks: Task[]
}

const TaskScheduleSchema = SchemaFactory.createForClass(TaskSchedule);
TaskScheduleSchema.index({ date: 1 }, { unique: true });

export default TaskScheduleSchema;
