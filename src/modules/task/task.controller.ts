import { ApiBody, ApiTags } from '@nestjs/swagger';
import { apibody_createTask } from './api-body.swagger';
import { GetTasksDto } from './dto/get-tasks.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskService } from './task.service';
import { Controller, Post, Body, Res, Get, Query } from '@nestjs/common';

@ApiTags('Task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @ApiBody(apibody_createTask)
  @Post()
  async createNewTask(
    @Body() createTaskDto: CreateTaskDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<any> {
    return this.taskService.createNewTask(createTaskDto);
  }

  @Get()
  async getTasks(
    @Query() getTasksDto: GetTasksDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<any> {
    return this.taskService.getTasks(getTasksDto);
  }
}
