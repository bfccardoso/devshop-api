import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { UserPublic } from './dto/user'
import { UserService } from './user.service'
import { UserCreateInput } from './dto/user-create.input'
import { UserMapper } from './user.mapper'
import { UserUpdateInput } from './dto/user-update.input'
import { AuthToken } from './dto/auth'
import { JwtService } from '@nestjs/jwt'
import { AuthUserInput } from './dto/auth-user.input'
import { AuthGuard } from 'src/utils/jwt-auth.guard'
import { UseGuards } from '@nestjs/common'
import { AuthUserId } from 'src/utils/jwt-user.decoraton'

@Resolver(() => UserPublic)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}
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

  @Mutation(() => AuthToken, { name: 'auth' })
  async auth(@Args('input') input: AuthUserInput): Promise<AuthToken> {
    const [user, refreshToken] = await this.userService.auth(
      input.email,
      input.passwd
    )
    if (user) {
      const authToken = new AuthToken()
      authToken.refreshToken = this.jwtService.sign(
        {
          scope: ['refreshToken'],
          id: refreshToken.id
        },
        {
          expiresIn: '8 hours'
        }
      )
      authToken.accessToken = this.jwtService.sign(
        {
          scope: ['accessToken', user.role],
          id: user.id
        },
        {
          expiresIn: '1 hour'
        }
      )
      return authToken
    }
    throw new Error('Bad credentials')
  }

  @Mutation(() => String, { name: 'accessToken' })
  async accessToken(
    @Args('refreshToken') refreshToken: string
  ): Promise<string> {
    const decoded = this.jwtService.verify(refreshToken)
    if (decoded && decoded.scope.indexOf('refreshToken') >= 0) {
      const authToken = await this.userService.getRefreshToken(decoded.id)
      const accessToken = this.jwtService.sign(
        {
          scope: ['accessToken', authToken.user.role],
          id: authToken.user.id
        },
        {
          expiresIn: '1 hour'
        }
      )
      return accessToken
    }
    return null
  }

  @UseGuards(AuthGuard)
  @Query(() => UserPublic, { name: 'getMe' })
  async getMe(@AuthUserId() id: string): Promise<UserPublic> {
    return await this.userService.findById(id)
  }
}
