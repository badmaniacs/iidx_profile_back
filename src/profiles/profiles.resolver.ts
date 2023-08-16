import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProfilesService } from './profiles.service';
import { Profile } from './models/profiles.model';
import { CreateProfileInput } from './dto/new-profile.input';

@Resolver(() => Profile)
export class ProfilesResolver {
  constructor(private readonly profileService: ProfilesService) {}

  @Query(() => Profile, { nullable: true })
  async getRecentProfileById(@Args('id') id: number): Promise<Profile | null> {
    return this.profileService.getProfileRecentById(id);
  }

  @Mutation(() => Profile)
  async createProfile(@Args('input') input: CreateProfileInput) {
    return this.profileService.createProfile({ ...input });
  }
}
