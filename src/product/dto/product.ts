import { Field, ObjectType } from '@nestjs/graphql'

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
  sku: string

  @Field({ nullable: true })
  price: number

  @Field({ nullable: true })
  weight: number

  @Field(() => [String], { nullable: true })
  images: string[]
}
