import { UserRegisterDto } from './../users/dto/user-register.dto copy';

export const apibody_userRegister = {
  type: UserRegisterDto,
  description: "User register body",
  examples: {
    user1: {
      summary: "user example 1",
      value: {
        usernameOrEmail: 'hoang',
        password: '1234567'
      } as UserRegisterDto
    },
  }
}