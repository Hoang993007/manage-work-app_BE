import { taskPriority, taskPriorityEnum } from './../../shares/constants/constants';
import { CreateTaskDto } from './dto/create-task.dto';

export const apibody_createTask = {
  type: CreateTaskDto,
  description: "create new task",
  examples: {
    task_1: {
      summary: "create task 1",
      value: {
        date: new Date(),
        name: 'Task test',
        description: 'Task test',
        priority: taskPriority.URGENT,
        estimateTime: 1,
        note: 'This is test task, needn\'t to execute'
      } as CreateTaskDto
    },
  }
}