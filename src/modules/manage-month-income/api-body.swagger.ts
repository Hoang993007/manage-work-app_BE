import { CreateIncomeDto } from './dto/create-income.dto';
import { CreateManageMonthIncomeDto } from "./dto/create-manage-month-income.dto";

export const apibody_createManageMonthIncome = {
  type: CreateManageMonthIncomeDto
}

export const apibody_createIncome = {
  type: CreateIncomeDto,
  description: "create admin body",
  examples: {
    income_1: {
      summary: "create super admin",
      value: {
        date: '1/5/2023',
        incomes: [
          {
            source: 'string',
            description: 'string',
            amount: 100000
          },
          {
            source: 'string',
            description: 'string',
            amount: 200000
          }
        ]
      } as CreateIncomeDto
    },
  }
}