import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { Product } from './product.entity'
import { ProductService } from './product.service'
import { ProductResolver } from './product.resolver'
import { ProductSlugIsUnique } from './validations/productSlugIsUnique'
import { S3 } from 'src/utils/s3'
import { Category } from 'src/category/category.entity'
import { Brand } from 'src/brand/brand.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, Brand])],
  providers: [ProductService, ProductResolver, ProductSlugIsUnique, S3]
})
export class ProductModule {}
