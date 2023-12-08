import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { Product } from './product.entity'
import { ProductService } from './product.service'
import { ProductResolver } from './product.resolver'
import { ProductSlugIsUnique } from './validations/productSlugIsUnique'

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductService, ProductResolver, ProductSlugIsUnique]
})
export class ProductModule {}
