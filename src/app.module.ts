import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './database/prisma.module';
import { ProfilesModule } from './profiles/profiles.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      playground: true,
    }),
    UsersModule,
    ProfilesModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
