import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { UserPublic } from './dto/user'
import { UserService } from './user.service'
import { UserCreateInput } from './dto/user-create.input'
import { UserMapper } from './user.mapper'
import { UserUpdateInput } from './dto/user-update.input'

@Resolver(() => UserPublic)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Query(() => [UserPublic], { name: 'getAllUsers' })
  async getAllUsers(): Promise<UserPublic[]> {
    return await this.userService.findAll()
  }

  @Query(() => UserPublic, { name: 'getUserById' })
  async getUserById(@Args('id') id: string): Promise<UserPublic> {
    return await this.userService.findById(id)
  }

  @Query(() => UserPublic, { name: 'getUserByEmail' })
  async getUserByEmail(@Args('email') email: string): Promise<UserPublic> {
    return await this.userService.findByEmail(email)
  }

  @Mutation(() => UserPublic, { name: 'createUser' })
  async createUser(@Args('input') input: UserCreateInput): Promise<UserPublic> {
    return this.userService.create(UserMapper.toEntity(input))
  }

  @Mutation(() => UserPublic, { name: 'updateUser' })
  async updateUser(@Args('input') input: UserUpdateInput): Promise<UserPublic> {
    return this.userService.update(UserMapper.toUpdateEntity(input))
  }

  @Mutation(() => Boolean, { name: 'deleteUser' })
  async deleteUser(@Args('id') input: string): Promise<boolean> {
    return this.userService.delete(input)
  }
}
