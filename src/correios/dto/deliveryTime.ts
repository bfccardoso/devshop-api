import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType('DeliveryTime')
export class DELIVERY_TIME {
  @Field({ nullable: true })
  coProduto: string

  @Field({ nullable: true })
  prazoEntrega: number

  @Field({ nullable: true })
  dataMaxima: string

  @Field({ nullable: true })
  entregaDomiciliar: string

  @Field({ nullable: true })
  entregaSabado: string

  @Field({ nullable: true })
  msgPrazo: string
}
