import { Controller, Post, Body } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileInput } from './dto/new-profile.input';

@Controller('profiles')
export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}

  @Post()
  async createProfile(@Body() data: CreateProfileInput) {
    const profile = await this.profilesService.createProfile(data);
    return profile;
  }
}
