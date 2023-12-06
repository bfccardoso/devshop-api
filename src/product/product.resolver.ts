import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ProductService } from './product.service'
import { ProductPublic } from './dto/product'
import { ProductCreateInput } from './dto/product-create.input'
import { ProductMapper } from './product.mapper'
import { ProductUpdateInput } from './dto/product-update.input'

@Resolver(() => ProductPublic)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [ProductPublic], { name: 'getAllProducts' })
  async getAllProducts(): Promise<ProductPublic[]> {
    return await this.productService.findAll()
  }

  @Mutation(() => ProductPublic, { name: 'createProduct' })
  async createProduct(
    @Args('input') input: ProductCreateInput
  ): Promise<ProductPublic> {
    return this.productService.create(ProductMapper.toEntity(input))
  }

  @Query(() => ProductPublic, { name: 'getProductById' })
  async getProductById(@Args('id') id: string): Promise<ProductPublic> {
    return await this.productService.findById(id)
  }

  @Mutation(() => ProductPublic, { name: 'updateProduct' })
  async updateProduct(
    @Args('input') input: ProductUpdateInput
  ): Promise<ProductPublic> {
    return this.productService.update(ProductMapper.fromUpdateToEntity(input))
  }

  @Mutation(() => Boolean, { name: 'deleteProduct' })
  async deleteProduct(@Args('id') input: string): Promise<boolean> {
    return this.productService.delete(input)
  }
}
