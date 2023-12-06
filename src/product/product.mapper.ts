import { Product } from './product.entity'
import { ProductCreateInput } from './dto/product-create.input'
import { Category } from 'src/category/category.entity'
import { ProductUpdateInput } from './dto/product-update.input'

export class ProductMapper {
  public static toEntity(input: ProductCreateInput): Product {
    const entity = new Product()
    entity.name = input.name
    entity.slug = input.slug
    entity.description = input.description

    const category = new Category()
    category.id = input.category
    entity.category = category

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
}
