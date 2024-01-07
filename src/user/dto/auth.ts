import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType('AuthToken')
export class AuthToken {
  @Field({ nullable: true })
  refreshToken: string

  @Field({ nullable: false })
  accessToken: string
}
