import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/users/models/users.model';
import { UsersService } from './users.service';
import {
  CreateUserInput,
  LoginUserInput,
  UpdateUserInput,
} from './dto/new-user.input';
import { ErrorException, ErrorCode } from 'src/custom.error';
import { JwtService } from '@nestjs/jwt';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Query(() => User, { nullable: true })
  async getUserById(@Args('id') id: number): Promise<User | null> {
    return this.userService.getUserById(id);
  }

  @Query(() => User, { nullable: true })
  async getUserByUsername(
    @Args('username') username: string,
  ): Promise<User | null> {
    return this.userService.getUserByUsername(username);
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    const { username, password, email } = input;
    const existingUser = await this.userService.getUserByUsername(username);
    const existingEmailUser = await this.userService.getUserByEmail(email);

    if (existingUser && existingEmailUser) {
      throw new ErrorException(ErrorCode.DUPLICATE_USERNAME_AND_EMAIL);
    } else if (existingUser) {
      throw new ErrorException(ErrorCode.DUPLICATE_USERNAME);
    } else if (existingEmailUser) {
      throw new ErrorException(ErrorCode.DUPLICATE_EMAIL);
    }
    return this.userService.createUser({ username, password, email });
  }

  @Mutation(() => User, { nullable: true })
  async updateUser(
    @Args('id') id: number,
    @Args('input') input: UpdateUserInput,
  ): Promise<User | null> {
    return this.userService.updateUser(id, input);
  }

  @Mutation(() => User, { nullable: true })
  async deleteUser(@Args('id') id: number): Promise<User | null> {
    return this.userService.deleteUser(id);
  }

  @Mutation(() => User, { nullable: true })
  async LoginUser(@Args('input') input: LoginUserInput): Promise<User | null> {
    const user = await this.userService.loginUser(input);
    if (user) {
      const payload = { username: user.username, sub: user.id };
      const accessToken = this.jwtService.sign(payload);

      return { ...user, accessToken };
    }
    return null;
  }
}
