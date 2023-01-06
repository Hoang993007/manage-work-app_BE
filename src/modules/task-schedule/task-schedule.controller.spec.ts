import { Test, TestingModule } from '@nestjs/testing';
import { TaskScheduleController } from './task-schedule.controller';

describe('TaskScheduleController', () => {
  let controller: TaskScheduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskScheduleController],
    }).compile();

    controller = module.get<TaskScheduleController>(TaskScheduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
