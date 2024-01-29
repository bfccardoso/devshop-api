import { Field, InputType, Float, Int } from '@nestjs/graphql'
import { IsUUID, Length, Matches, Validate } from 'class-validator'
import { ProductSlugIsUnique } from '../validations/productSlugIsUnique'
import { VariationInput } from './variation.input'

@InputType()
export class ProductCreateInput {
  @Field()
  @Length(3)
  name: string

  @Field()
  @Length(3)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  @Validate(ProductSlugIsUnique)
  slug: string

  @Field()
  @Length(20)
  description: string

  @Field()
  @IsUUID()
  category: string

  @Field()
  @IsUUID()
  brand: string

  @Field({ nullable: true })
  sku: string

  @Field(() => Float, { nullable: true })
  price: number

  @Field(() => Float, { nullable: true })
  weight: number

  @Field(() => Int, { nullable: true })
  stock: number

  @Field(() => [String], { nullable: true })
  optionNames: string[]

  @Field(() => [VariationInput], { nullable: true })
  variations: VariationInput[]
}
