import { Resolver, Args, Query } from '@nestjs/graphql'
import { CorreiosService } from './correios.service'
import { ADDRESS } from './dto/address'
import { DELIVERY_TIME } from './dto/deliveryTime'
import { SHIPPING_PRICE } from './dto/shippingPrice'

@Resolver()
export class CorreiosResolver {
  constructor(private readonly correiosService: CorreiosService) {}

  @Query(() => ADDRESS, { name: 'getAddressByZipCode' })
  async getAddressByZipCode(
    @Args('zipCode') zipCode: string
  ): Promise<ADDRESS> {
    return await this.correiosService.getAddress(zipCode)
  }

  @Query(() => DELIVERY_TIME, { name: 'getDeliveryTime' })
  async getDeliveryTime(
    @Args('codProduct') productCode: string,
    @Args('cepDestino') destinationZipCode: string,
    @Args('date') date: string
  ): Promise<DELIVERY_TIME> {
    return await this.correiosService.getDeliveryTime(
      productCode,
      destinationZipCode,
      date
    )
  }

  @Query(() => SHIPPING_PRICE, { name: 'getShippingPrice' })
  async getShippingPrice(
    @Args('codProduct') productCode: string,
    @Args('cepDestino') destinationZipCode: string,
    @Args('date') date: string,
    @Args('weight') weight: number,
    @Args('objectType') objectType: number,
    @Args('length') length: number,
    @Args('width') width: number,
    @Args('height') height: number
  ): Promise<SHIPPING_PRICE> {
    return await this.correiosService.getShippingPrice(
      productCode,
      destinationZipCode,
      date,
      weight,
      objectType,
      length,
      width,
      height
    )
  }
}
