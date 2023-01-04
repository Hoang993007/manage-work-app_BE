import { SALT_ROUNDS } from './../constants/env.constants';
import { hash, compare } from 'bcrypt';

export const encryptText = async (text: string) => {
  return await hash(text, SALT_ROUNDS);
}

export const compareBcrypt = async (srcText: string, cmpText: string) => {
  return await compare(srcText, cmpText);
}