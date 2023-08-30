import { Injectable } from '@nestjs/common';
import { ProfilesRepository } from './profiles.repository';
import { CreateProfileInput, MusicDataInput } from './dto/new-profile.input';

@Injectable()
export class ProfilesService {
  constructor(private repository: ProfilesRepository) {}

  async createProfile(data: CreateProfileInput) {
    const profileData = this.processProfileData(data);

    const profile = await this.repository.createProfile(profileData);
    return profile;
  }

  async getProfileRecentById(userId: number) {
    return await this.repository.getProfileRecentById({ userId });
  }

  private processProfileData(data: CreateProfileInput) {
    const profileData = {
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
        SP: this.processMusicData(data.musicData.SP),
        DP: this.processMusicData(data.musicData.DP),
      },
      user: { connect: { id: data.userId } },
      ver: data.ver,
    };

    return profileData;
  }

  private processMusicData(MusicDataInput: MusicDataInput[]) {
    return MusicDataInput.map((music) => ({
      music_name: music.music_name,
      level: music.level,
      difficulty: music.difficulty,
      rank: music.rank,
      score: music.score,
      clear_type: music.clear_type,
      play_type: music.play_type,
    }));
  }
}
