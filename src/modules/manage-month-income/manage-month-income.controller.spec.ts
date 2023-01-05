import { Test, TestingModule } from '@nestjs/testing';
import { ManageMonthIncomeController } from './manage-month-income.controller';

describe('ManageMonthIncomeController', () => {
  let controller: ManageMonthIncomeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageMonthIncomeController],
    }).compile();

    controller = module.get<ManageMonthIncomeController>(ManageMonthIncomeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
