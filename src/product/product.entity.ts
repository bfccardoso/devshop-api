import { Category } from '../category/category.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

interface ProductVariation {
  optionName1: string,
  optionName2: string,
  sku: string,
  price: number,
  weight: number
}

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

  @Column({type: 'jsonb', nullable: true})
  optionNames: string[]

  @Column({type: 'jsonb', nullable: true})
  variations: ProductVariation[]

  @Column({ length: 250, nullable: true })
  sku: string

  @Column({ nullable: true, type: 'money' })
  price: number

  @Column({ nullable: true, type: 'decimal' })
  weight: number

  @Column({type: 'jsonb', nullable: true})
  images: string[]
}
