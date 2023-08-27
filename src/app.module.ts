import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './database/prisma.module';
import { ProfilesModule } from './profiles/profiles.module';
import { GraphQLError } from 'graphql';
import { ErrorException, ErrorDto } from './custom.error';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      playground: true,
      formatError: (error: GraphQLError) => {
        const originalError = error.originalError as Error;

        if (originalError instanceof ErrorException) {
          const errorCode = originalError.errorCode;
          return new ErrorDto(errorCode);
        }

        return error;
      },
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: '1d' },
    }),
    UsersModule,
    ProfilesModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
