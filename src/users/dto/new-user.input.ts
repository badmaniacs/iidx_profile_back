import { Field, InputType, PickType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@InputType()
export class UpdateUserInput extends PickType(CreateUserInput, ['password']) {}
