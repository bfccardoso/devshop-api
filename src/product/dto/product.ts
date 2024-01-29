import { Field, ObjectType, Float, Int } from '@nestjs/graphql'

@ObjectType('Variation')
export class Variation {
  @Field()
  optionName1: string
  
  @Field()
  optionName2: string
  
  @Field()
  sku: string
  
  @Field(() => Float)
  price: number
  
  @Field(() => Float)
  weight: number
  
  @Field(() => Int)
  stock: number
}

@ObjectType('Product')
export class ProductPublic {
  @Field({ nullable: true })
  id: string

  @Field({ nullable: true })
  name: string

  @Field({ nullable: true })
  slug: string

  @Field({ nullable: true })
  description: string

  @Field({ nullable: true })
  category: string

  @Field({ nullable: true })
  brand: string

  @Field({ nullable: true })
  sku: string

  @Field({ nullable: true })
  price: number

  @Field({ nullable: true })
  weight: number

  @Field(() => [String], { nullable: true })
  images: string[]

  @Field(() => [String], { nullable: true })
  optionNames: string[]

  @Field(() => [Variation], { nullable: true })
  variations: Variation[]
}
