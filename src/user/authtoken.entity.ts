import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { User } from './user.entity'

@Entity()
export class AuthToken {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => User, user => user.authTokens) user: User
  @Column({ type: 'timestamp' })
  createdAt: Date

  @BeforeInsert()
  setCreatedDate(): void {
    this.createdAt = new Date()
  }
}
