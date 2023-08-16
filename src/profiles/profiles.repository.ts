import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateProfileInput } from './dto/new-profile.input';

@Injectable()
export class ProfilesRepository {
  constructor(private prisma: PrismaService) {}

  async createProfile(data: CreateProfileInput) {
    const profile = await this.prisma.profileData.create({
      data: {
        djName: data.djName,
        region: data.region,
        iidxId: data.iidxId,
        class: data.class,
        arena: data.arena,
        radar: {
          SP: JSON.stringify(data.radar.SP),
          DP: JSON.stringify(data.radar.DP),
        },
        musicData: {
          SP: data.musicData.SP.map((music) => ({
            music_name: music.music_name,
            level: music.level,
            difficulty: music.difficulty,
            rank: music.rank,
            score: music.score,
            clear_type: music.clear_type,
            play_type: music.play_type,
          })),
          DP: data.musicData.DP.map((music) => ({
            music_name: music.music_name,
            level: music.level,
            difficulty: music.difficulty,
            rank: music.rank,
            score: music.score,
            clear_type: music.clear_type,
            play_type: music.play_type,
          })),
        },
        user: { connect: { id: data.userId } },
      },
    });
    return profile;
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
