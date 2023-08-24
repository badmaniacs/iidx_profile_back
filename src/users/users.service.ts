import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersRepository } from './users.repository';
import { CreateUserInput, LoginUserInput } from './dto/new-user.input';

@Injectable()
export class UsersService {
  constructor(private repository: UsersRepository) {}

  async createUser(data: CreateUserInput) {
    const user = await this.repository.createUser(data);

    return user;
  }
  async getUserById(id: number): Promise<User | null> {
    return this.repository.getUserById(id);
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return this.repository.getUserByUsername(username);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.repository.getUserByEmail(email);
  }

  async updateUser(id: number, newData: Partial<User>): Promise<User | null> {
    return this.repository.updateUser(id, newData);
  }

  async deleteUser(id: number): Promise<User | null> {
    return this.repository.deleteUser(id);
  }

  async loginUser(data: LoginUserInput) {
    return this.repository.LoginUser(data);
  }
}
