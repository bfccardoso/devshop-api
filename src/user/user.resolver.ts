import {
  Resolver,
  Query,
  Args,
  Mutation,
  Context,
  GraphQLExecutionContext
} from '@nestjs/graphql'
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
import { UserPassUpdateInput } from './dto/user-pass-update.input'
import { AuthSession } from './dto/auth-session'
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js'
import * as FileUpload from 'graphql-upload/Upload.js'

@Resolver(() => UserPublic)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  @UseGuards(AuthGuard)
  @Query(() => [UserPublic], { name: 'panelGetAllUsers' })
  async getAllUsers(): Promise<UserPublic[]> {
    return await this.userService.findAll()
  }

  @UseGuards(AuthGuard)
  @Query(() => [AuthSession], { name: 'panelGetAllUsersSessions' })
  async getAllUsersSessions(@Args('id') id: string): Promise<AuthSession[]> {
    return await this.userService.findAllUsersSessions(id)
  }

  @UseGuards(AuthGuard)
  @Query(() => UserPublic, { name: 'panelGetUserById' })
  async getUserById(@Args('id') id: string): Promise<UserPublic> {
    return await this.userService.findById(id)
  }

  @UseGuards(AuthGuard)
  @Query(() => UserPublic, { name: 'panelGetUserByEmail' })
  async getUserByEmail(@Args('email') email: string): Promise<UserPublic> {
    return await this.userService.findByEmail(email)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => UserPublic, { name: 'panelCreateUser' })
  async createUser(@Args('input') input: UserCreateInput): Promise<UserPublic> {
    return this.userService.create(UserMapper.toEntity(input))
  }

  @UseGuards(AuthGuard)
  @Mutation(() => UserPublic, { name: 'panelUpdateUser' })
  async updateUser(@Args('input') input: UserUpdateInput): Promise<UserPublic> {
    return this.userService.update(UserMapper.toUpdateEntity(input))
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean, { name: 'panelChangeUserPass' })
  async changeUserPass(
    @Args('input') input: UserPassUpdateInput
  ): Promise<boolean> {
    return this.userService.changePassword(input.id, input.passwd)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean, { name: 'panelDeleteUser' })
  async deleteUser(@Args('id') input: string): Promise<boolean> {
    return this.userService.delete(input)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean, { name: 'panelUploadUserPicture' })
  async uploadUserPicture(
    @Args('id') id: string,
    @Args('file', { type: () => GraphQLUpload })
    file: FileUpload
  ): Promise<boolean> {
    const { createReadStream, filename, mimetype } = file
    return this.userService.uploadUserPicture(
      id,
      createReadStream,
      filename,
      mimetype
    )
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean, { name: 'panelRemoveUserPicture' })
  async removeUserPicture(@Args('id') id: string): Promise<boolean> {
    return this.userService.removeUserPicture(id)
  }

  @Mutation(() => AuthToken, { name: 'auth' })
  async auth(
    @Context() context: GraphQLExecutionContext,
    @Args('input') input: AuthUserInput
  ): Promise<AuthToken> {
    const [user, refreshToken] = await this.userService.auth(
      input.email,
      input.passwd,
      context['req']['headers']['user-agent']
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
  @Mutation(() => Boolean, { name: 'panelInvalidateUserSession' })
  async invalidateUserSession(@Args('id') input: string): Promise<boolean> {
    return this.userService.invalidateRefreshToken(input)
  }

  @UseGuards(AuthGuard)
  @Query(() => UserPublic, { name: 'panelGetMe' })
  async getMe(@AuthUserId() id: string): Promise<UserPublic> {
    return await this.userService.findById(id)
  }
}
