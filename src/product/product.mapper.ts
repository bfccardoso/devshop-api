import { Product } from './product.entity'
import { ProductCreateInput } from './dto/product-create.input'
import { Category } from 'src/category/category.entity'
import { ProductUpdateInput } from './dto/product-update.input'
import { ProductPublic } from './dto/product'
import { Brand } from '../brand/brand.entity'

export class ProductMapper {
  public static toEntity(input: ProductCreateInput): Product {
    const entity = new Product()
    entity.name = input.name
    entity.slug = input.slug
    entity.description = input.description

    const category = new Category()
    category.id = input.category
    entity.category = category

    const brand = new Brand()
    brand.id = input.brand
    entity.brand = brand

    entity.sku = input.sku
    entity.price = input.price
    entity.weight = input.weight
    entity.stock = input.stock

    entity.optionNames = input.optionNames

    entity.variations = input.variations

    return entity
  }
  public static fromUpdateToEntity(input: ProductUpdateInput): Product {
    const entity = new Product()
    entity.id = input.id
    entity.name = input.name
    entity.slug = input.slug
    entity.description = input.description

    const category = new Category()
    category.id = input.category
    entity.category = category

    return entity
  }
  public static fromEntityToPublic(entity: Product): ProductPublic {
    const product = new ProductPublic()
    product.id = entity.id
    product.name = entity.name
    product.slug = entity.slug
    product.sku = entity.sku
    product.price = entity.price //Number(entity.price.toString().replace('R$ ', '').replace(',', '.'))
    product.weight = entity.weight
    product.description = entity.description
    product.category = entity.category.id
    product.brand = entity.brand.id
    product.images = entity.images
    product.variations = entity.variations
    product.optionNames = entity.optionNames
    return product
  }
}
