import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType('ShippingPrice')
export class SHIPPING_PRICE {
  @Field({ nullable: true })
  coProduto: string

  @Field({ nullable: true })
  pcBase: string

  @Field({ nullable: true })
  pcBaseGeral: string

  @Field({ nullable: true })
  peVariacao: string

  @Field({ nullable: true })
  pcReferencia: string

  @Field({ nullable: true })
  vlBaseCalculoImposto: string

  @Field({ nullable: true })
  inPesoCubico: string

  @Field({ nullable: true })
  psCobrado: string

  @Field({ nullable: true })
  peAdValorem: string

  @Field({ nullable: true })
  vlSeguroAutomatico: string

  @Field({ nullable: true })
  qtAdicional: string

  @Field({ nullable: true })
  pcFaixa: string

  @Field({ nullable: true })
  pcFaixaVariacao: string

  @Field({ nullable: true })
  pcProduto: string

  @Field({ nullable: true })
  pcFinal: string
}
