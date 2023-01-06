import { addQueryLimitOffset, paginationReturnMetadata } from './../../shares/utils/utils';
import { GetTasksDto } from './dto/get-tasks.dto';
import { modelName } from 'src/shares/constants/mongoModelName';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { TaskDocument } from './schemas/task.schema';
import { Model } from 'mongoose';
import { taskPriorityEnum } from 'src/shares/constants/constants';

@Injectable()
export class TaskService {
  constructor(@InjectModel(modelName.TASK_MODEL) private taskModel: Model<TaskDocument>) { }

  async createNewTask(createTaskDto: CreateTaskDto) {
    const newTask = new this.taskModel(createTaskDto);
    await newTask.save();

    return newTask
  }

  async getTasks(getTasksDto: GetTasksDto) {
    // When executing a query with a callback function, you specify your query as a JSON document. 
    const res1 = this.taskModel.findOne({
      // write JSON document here
    }, 'name', function (err, task) {
      if (err) {
        console.log(err)
        return
      };

      console.log('### TEST --- Query completed: ', task)
    })
    console.log('Test promise of above query')
    // res1.then(() => console.log('Update 2'));
    // console.log('Test promise of above query #1')
    // res1.then(() => console.log('Update 3'));
    // console.log('Test promise of above query #2')
    // passing a callback to a query function immediately executes the query, and calling then() executes the query again.
    // ---> make query execute again - duplicate operations ===> not allowed = throwing error?? seems that error are threw by nestjs, not mongoose itself

    /**
     * In the under code, the query variable is of type Query.
     * A Query enables you to build up a query using chaining syntax, rather than specifying a JSON object. 
     **/

    const { priorities } = getTasksDto;

    let prioritiesArr = [];
    if (priorities) {
      const prioritiesArrTmp = priorities.split(',');

      for (let i = 0; i < prioritiesArrTmp.length; i++) {
        if (!taskPriorityEnum.includes(prioritiesArrTmp[i])) {
          throw new HttpException('Wrong priorities', HttpStatus.BAD_REQUEST)
        }
      }
      prioritiesArr = prioritiesArrTmp;
    }

    const query: any = {};

    if (prioritiesArr.length > 0) {
      query.priority = { $in: priorities };
    }

    const getTaskQuery = this.taskModel.find(query);
    const { limit, offset } = addQueryLimitOffset(getTaskQuery, getTasksDto.limit, getTasksDto.offset)
    const result = await getTaskQuery.exec();

    const total = await this.taskModel.countDocuments(query);

    return {
      data: result,
      metadata: paginationReturnMetadata(limit, offset, total),
    };
  }
}
