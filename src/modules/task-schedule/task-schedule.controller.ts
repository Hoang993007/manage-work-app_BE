import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

@ApiTags('Task schedule')
@Controller('task-schedule')
export class TaskScheduleController {
  @Get()
  getTashSchedule() {}
}
