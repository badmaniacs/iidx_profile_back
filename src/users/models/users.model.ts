import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { User as UserDB } from '@prisma/client';

@ObjectType()
export class User {
  @Field(() => Int)
  id: UserDB['id'];

  @Field(() => GraphQLISODateTime)
  createAt: UserDB['createAt'];

  @Field(() => String)
  username: UserDB['username'];

  @Field(() => String)
  password: UserDB['password'];
}
