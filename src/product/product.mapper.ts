import { Product } from './product.entity'
import { ProductCreateInput } from './dto/product-create.input'
import { Category } from 'src/category/category.entity'
import { ProductUpdateInput } from './dto/product-update.input'
import { ProductPublic } from './dto/product'

export class ProductMapper {
  public static toEntity(input: ProductCreateInput): Product {
    const entity = new Product()
    entity.name = input.name
    entity.slug = input.slug
    entity.description = input.description

    const category = new Category()
    category.id = input.category
    entity.category = category

    entity.sku = input.sku
    entity.price = input.price
    entity.weight = input.weight

    entity.optionNames = input.optionNames

    entity.variations = [input.variations]

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
    console.log('entity: ', entity)
    product.id = entity.id
    product.name = entity.name
    product.slug = entity.slug
    product.sku = entity.sku
    product.price = entity.price
    product.weight = entity.weight
    product.description = entity.description
    product.category = entity.category.id
    product.images = entity.images
    return product
  }
}
