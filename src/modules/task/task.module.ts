import { modelName } from './../../shares/constants/mongoModelName';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskService } from './task.service';
import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import TaskSchema from './schemas/task.schema';

@Module({
  controllers: [TaskController],
  imports: [
    MongooseModule.forFeature([{ name: modelName.TASK_MODEL, schema: TaskSchema }])
  ],
  providers: [TaskService],
  exports: [
    TaskService,
    MongooseModule
  ]
})
export class TaskModule { }
