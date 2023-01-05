import { Test, TestingModule } from '@nestjs/testing';
import { ManageMonthIncomeService } from './manage-month-income.service';

describe('ManageMonthIncomeService', () => {
  let service: ManageMonthIncomeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageMonthIncomeService],
    }).compile();

    service = module.get<ManageMonthIncomeService>(ManageMonthIncomeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
