import { Field, InputType, Float, Int } from '@nestjs/graphql'

@InputType()
export class VariationInput {
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