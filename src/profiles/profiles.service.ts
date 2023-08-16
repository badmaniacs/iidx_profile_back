import { Injectable } from '@nestjs/common';
import { ProfilesRepository } from './profiles.repository';
import { CreateProfileInput } from './dto/new-profile.input';

@Injectable()
export class ProfilesService {
  constructor(private repository: ProfilesRepository) {}

  async createProfile(data: CreateProfileInput) {
    const profile = await this.repository.createProfile(data);
    return profile;
  }
  async getProfileRecentById(userId: number) {
    return await this.repository.getProfileRecentById({ userId: userId });
  }
}
