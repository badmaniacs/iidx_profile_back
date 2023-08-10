import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(params: { data: Prisma.UserCreateInput }): Promise<User> {
    const { data } = params;
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
}
