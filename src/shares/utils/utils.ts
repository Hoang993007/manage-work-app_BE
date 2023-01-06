import { monthOfYearEnum, dayOfWeek, dayOfWeekEnum } from './../constants/constants';
import { SALT_ROUNDS } from './../constants/env.constants';
import { hash, compare } from 'bcrypt';
import { Query } from 'mongoose';

export const encryptText = async (text: string) => {
  return await hash(text, SALT_ROUNDS);
}

export const compareBcrypt = async (srcText: string, cmpText: string) => {
  return await compare(srcText, cmpText);
}

export const convertMonthNumToName = (monthNum: number | string) => {
  const monthIndex = typeof monthNum === 'number' ? monthNum : Number(monthNum);
  return monthOfYearEnum[monthIndex - 1];
}

//dayOfWeek: convertDayOfWeekNumToDayOfWeekName(createIncomeUtcDay.toLocaleString()),
export const convertDayOfWeekNumToDayOfWeekName = (dayNum: number | string) => {
  const dayOfWeekIndex = typeof dayNum === 'number' ? dayNum : Number(dayNum);
  return dayOfWeekEnum[dayOfWeekIndex];
}

export const addQueryLimitOffset = (
  query: Query<any, any, any, any>,
  limit: number = 20,
  offset: number = 0,
  threshold: number = 20
) => {
  if (limit > threshold) limit = threshold;
  query
    .limit(limit)
    .skip(offset)

  return { limit, offset }
}

export const paginationReturnMetadata = (limit: number, offset: number, total: number) => {
  return {
    page: Math.ceil(offset / limit + 1),
    limit: Number(limit),
    totalItem: total,
    totalPage: Math.ceil(total / limit),
  }
}