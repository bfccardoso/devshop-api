import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType('Address')
export class ADDRESS {
  @Field({ nullable: true })
  cep: string

  @Field({ nullable: true })
  uf: string

  @Field({ nullable: true })
  numeroLocalidade: number

  @Field({ nullable: true })
  localidade: string

  @Field({ nullable: true })
  logradouro: string

  @Field({ nullable: true })
  tipoLogradouro: string

  @Field({ nullable: true })
  nomeLogradouro: string

  @Field({ nullable: true })
  abreviatura: string

  @Field({ nullable: true })
  bairro: string

  @Field({ nullable: true })
  tipoCEP: number
}
