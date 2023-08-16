import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesResolver } from './profiles.resolver';
import { PrismaModule } from 'src/database/prisma.module';
import { ProfilesRepository } from './profiles.repository';

@Module({
  imports: [PrismaModule],
  providers: [ProfilesService, ProfilesResolver, ProfilesRepository],
  exports: [ProfilesService],
})
export class ProfilesModule {}
