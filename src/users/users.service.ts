import { Injectable, Inject } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersRepository } from './users.repository';
import { CreateUserInput, LoginUserInput } from './dto/new-user.input';
import { v4 as uuidv4 } from 'uuid';
import { RedisClientType } from 'redis';

@Injectable()
export class UsersService {
  constructor(
    private repository: UsersRepository,
    @Inject('REDIS_CLIENT') private redis: RedisClientType,
  ) {}

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

  async generatePass(data: { username: string; id: number }) {
    const pass = uuidv4();
    await this.redis.set(pass, JSON.stringify({ ...data }), { EX: 1800 });
    return pass;
  }

  async validatePass(pass: string) {
    console.log(pass);
    const passData = await this.redis.get(pass);
    console.log(passData);
    if (!passData) {
      return false;
    }
    return JSON.parse(passData);
  }

  async deletePass(pass: string) {
    await this.redis.del(pass);
  }
}
