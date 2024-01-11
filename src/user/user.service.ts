import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import { Repository } from 'typeorm'
import { AuthToken } from './authtoken.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(AuthToken)
    private authTokenRepository: Repository<AuthToken>
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  async findAllUsersSessions(id: string): Promise<AuthToken[]> {
    return await this.authTokenRepository.query(
      'SELECT * FROM "auth_token" WHERE (("userId" = $1))',
      [id]
    )
  }

  // async findAllUsersSessions(id: string): Promise<AuthToken[]> {
  //   return await this.authTokenRepository
  //     .createQueryBuilder('authToken')
  //     .where('"userId" = :id', { id })
  //     .getMany()
  // }

  // async findAllUsersSessions(id: string): Promise<AuthToken[]> {
  //   return await this.authTokenRepository.find({
  //     where: {
  //       "user.id": id
  //     } as any // Utilize 'as any' para contornar o problema de tipo
  //   })
  // }

  async findById(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id: id })
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: [{ email }] })
  }

  async create(input: User): Promise<User> {
    return this.userRepository.save(input)
  }

  async auth(
    email: string,
    passwd: string,
    userAgent: string
  ): Promise<[User, AuthToken]> {
    const user = await this.userRepository.findOne({ where: [{ email }] })
    if (user && (await user.checkPassword(passwd))) {
      const authToken = new AuthToken()
      authToken.userAgent = userAgent
      authToken.user = user
      const token = await this.authTokenRepository.save(authToken)
      return [user, token]
    }
    return [null, null]
  }

  async getRefreshToken(id: string): Promise<AuthToken> {
    const refreshToken = await this.authTokenRepository.findOne({
      where: [{ id, active: true }],
      relations: ['user']
    })
    console.log('refreshToken:', refreshToken)
    refreshToken.lastUsedAt = new Date()
    await this.authTokenRepository.save(refreshToken)
    return refreshToken
  }

  async invalidateRefreshToken(id: string): Promise<boolean> {
    const refreshToken = await this.authTokenRepository.findOne({
      where: [{ id }]
    })
    refreshToken.active = false
    await this.authTokenRepository.save(refreshToken)
    return true
  }

  async update(input: User): Promise<User> {
    const entity = await this.userRepository.findOneBy({ id: input.id })
    ;(entity.name = input.name),
      (entity.email = input.email),
      (entity.passwd = input.passwd),
      (entity.role = input.role)
    await this.userRepository.save(entity)
    return input
  }

  async changePassword(id: string, newPasswd: string): Promise<boolean> {
    const entity = await this.userRepository.findOneBy({ id: id })
    entity.passwd = newPasswd
    await this.userRepository.save(entity)
    return true
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.userRepository.delete(id)
      return true
    } catch (err) {
      return false
    }
  }
}
