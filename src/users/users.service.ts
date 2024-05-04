import { Injectable, Inject } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersRepository } from './users.repository';
import { CreateUserInput, LoginUserInput } from './dto/new-user.input';
import { v4 as uuidv4 } from 'uuid';
import { RedisClientType } from 'redis';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private repository: UsersRepository,
    @Inject('REDIS_CLIENT') private redis: RedisClientType,
  ) {}

  async createUser(data: CreateUserInput) {
    const { password } = data;
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await this.repository.createUser({
      ...data,
      password: hashPassword,
    });

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
    const { password } = data;
    const user = await this.repository.getUserByUsername(data.username);

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      return user;
    } else {
      return null;
    }
  }

  async generatePass(data: { username: string; id: number }) {
    const pass = uuidv4();
    await this.redis.set(pass, JSON.stringify({ ...data }), { EX: 1800 });
    return pass;
  }

  async validatePass(pass: string) {
    const passData = await this.redis.get(pass);
    if (!passData) {
      return false;
    }
    return JSON.parse(passData);
  }

  async deletePass(pass: string) {
    await this.redis.del(pass);
  }

  async validUserId(data: { username: string; id: number }) {
    const user = await this.repository.validUserId(data);
    if (!user || user.id !== data.id) {
      return null;
    }
    return { id: user.id, username: user.username };
  }
}
