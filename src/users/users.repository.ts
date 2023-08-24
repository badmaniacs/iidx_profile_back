import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { LoginUserInput } from './dto/new-user.input';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async getUserById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async updateUser(
    id: number,
    newData: Prisma.UserUpdateInput,
  ): Promise<User | null> {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: newData,
    });
  }

  async deleteUser(id: number): Promise<User | null> {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async LoginUser(data: LoginUserInput) {
    return this.prisma.user.findUnique({
      where: { ...data },
    });
  }
}
