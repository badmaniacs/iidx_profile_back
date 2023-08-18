import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ProfilesRepository {
  constructor(private prisma: PrismaService) {}

  async createProfile(data: any) {
    return await this.prisma.profileData.create({
      data,
    });
  }

  async getProfileRecentById(params: { userId: number }) {
    const { userId } = params;

    return this.prisma.profileData.findFirst({
      where: {
        userId,
      },
    });
  }
}
