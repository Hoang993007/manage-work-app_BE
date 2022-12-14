import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      email: 'john@gmail.com',
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      email: 'maria@gmail.com',
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(emailOrUsername: string): Promise<User | undefined> {
    return this.users.find(user => (user.username === emailOrUsername || user.email === emailOrUsername));
  }

  async findOneById(userId: number): Promise<User | undefined> {
    return this.users.find(user => (user.userId === userId));
  }
}
