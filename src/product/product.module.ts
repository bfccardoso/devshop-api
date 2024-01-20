import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { Product } from './product.entity'
import { ProductService } from './product.service'
import { ProductResolver } from './product.resolver'
import { ProductSlugIsUnique } from './validations/productSlugIsUnique'
import { S3 } from 'src/utils/s3'

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductService, ProductResolver, ProductSlugIsUnique, S3]
})
export class ProductModule {}
