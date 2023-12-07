import { Category } from '../category/category.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 250, nullable: false })
  name: string

  @Column({ length: 900, nullable: false })
  description: string

  @Column({ length: 250, nullable: false })
  slug: string

  //relation / association
  //Product N -> 1 Category
  @ManyToOne(() => Category, category => category.id)
  category: Category
}
