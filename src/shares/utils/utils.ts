import { monthOfYearEnum, dayOfWeek, dayOfWeekEnum } from './../constants/constants';
import { SALT_ROUNDS } from './../constants/env.constants';
import { hash, compare } from 'bcrypt';

export const encryptText = async (text: string) => {
  return await hash(text, SALT_ROUNDS);
}

export const compareBcrypt = async (srcText: string, cmpText: string) => {
  return await compare(srcText, cmpText);
}

export const convertMonthNumToName = (monthNum: number | string) => {
  const monthIndex = typeof monthNum === 'number'? monthNum : Number(monthNum);
  return monthOfYearEnum[monthIndex - 1];
}

export const convertDayOfWeekNumToDayOfWeekName = (dayNum: number | string) => {
  const dayOfWeekIndex = typeof dayNum === 'number'? dayNum : Number(dayNum);
  return dayOfWeekEnum[dayOfWeekIndex];
}