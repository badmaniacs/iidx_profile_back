import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/users/models/users.model';
import { UsersService } from './users.service';
import { CreateUserInput, UpdateUserInput } from './dto/new-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

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
}
