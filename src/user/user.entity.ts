import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm'
import * as bcrypt from 'bcrypt'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 250, nullable: false })
  name: string

  @Column({ length: 450, nullable: false })
  email: string

  @Column({ length: 100, nullable: false })
  passwd: string

  @Column({ length: 100, nullable: false })
  role: string // root, user

  @Column({ type: 'timestamp', nullable: true })
  lastLogin: Date

  @Column({ type: 'timestamp' })
  createdAt: Date

  @Column({ type: 'timestamp' })
  updateAt: Date

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.passwd) {
      this.passwd = await bcrypt.hash(this.passwd, 10)
    }
  }

  @BeforeInsert()
  setCreatedDate(): void {
    this.createdAt = new Date()
    this.updateAt = new Date()
  }

  @BeforeUpdate()
  setUpdateDate(): void {
    this.updateAt = new Date()
  }
}
