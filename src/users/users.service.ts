import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private repository: UsersRepository) {}

  async createUser(params: {
    username: User[`username`];
    password: User[`password`];
  }) {
    const { username, password } = params;

    const user = await this.repository.createUser({
      data: {
        username,
        password,
      },
    });

    return user;
  }
  async getUserById(id: number): Promise<User | null> {
    return this.repository.getUserById(id);
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return this.repository.getUserByUsername(username);
  }

  async updateUser(id: number, newData: Partial<User>): Promise<User | null> {
    return this.repository.updateUser(id, newData);
  }

  async deleteUser(id: number): Promise<User | null> {
    return this.repository.deleteUser(id);
  }
}
