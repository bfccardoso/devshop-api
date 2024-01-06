import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  async findById(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id: id })
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: [{ email }] })
  }

  async create(input: User): Promise<User> {
    return this.userRepository.save(input)
  }

  async update(input: User): Promise<User> {
    const entity = await this.userRepository.findOneBy({id: input.id})
    entity.name = input.name,
    entity.email = input.email,
    entity.passwd = input.passwd,
    entity.role = input.role
    await this.userRepository.save(entity)
    return input
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