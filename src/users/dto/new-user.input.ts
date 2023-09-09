import { Field, InputType, PickType, OmitType } from '@nestjs/graphql';
import { IsEmail, IsString, Length, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  @Length(4, 15)
  username: string;

  @Field()
  @IsString()
  password: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

@InputType()
export class UpdateUserInput extends PickType(CreateUserInput, ['password']) {}

@InputType()
export class LoginUserInput extends OmitType(CreateUserInput, ['email']) {}
