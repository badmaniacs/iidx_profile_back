import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProfilesService } from './profiles.service';
import { Profile } from './models/profiles.model';
import { CreateProfileInput, GetProfileInput } from './dto/new-profile.input';

@Resolver(() => Profile)
export class ProfilesResolver {
  constructor(private readonly profileService: ProfilesService) {}

  @Query(() => Profile, { nullable: true })
  async getRecentProfileById(
    @Args('input') input: GetProfileInput,
  ): Promise<Profile | null> {
    return this.profileService.getProfileRecentById(input.id);
  }

  @Mutation(() => Profile)
  async createProfile(@Args('input') input: CreateProfileInput) {
    return this.profileService.createProfile({ ...input });
  }
}
