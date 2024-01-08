import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ProductService } from './product.service'
import { ProductPublic } from './dto/product'
import { ProductCreateInput } from './dto/product-create.input'
import { ProductMapper } from './product.mapper'
import { ProductUpdateInput } from './dto/product-update.input'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/utils/jwt-auth.guard'

@Resolver(() => ProductPublic)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [ProductPublic], { name: 'getAllProducts' })
  async getAllProducts(): Promise<ProductPublic[]> {
    const products = await this.productService.findAll()
    return products.map(ProductMapper.fromEntityToPublic) 
  }

  @UseGuards(AuthGuard)
  @Mutation(() => ProductPublic, { name: 'panelCreateProduct' })
  async createProduct(
    @Args('input') input: ProductCreateInput
  ): Promise<ProductPublic> {
    return ProductMapper.fromEntityToPublic(
      await this.productService.create(ProductMapper.toEntity(input))
    )
  }

  @Query(() => ProductPublic, { name: 'getProductById' })
  async getProductById(@Args('id') id: string): Promise<ProductPublic> {
    return ProductMapper.fromEntityToPublic(
      await this.productService.findById(id)
    )
  }

  @Query(() => ProductPublic, { name: 'getProductBySlug' })
  async getProductBySlug(@Args('slug') slug: string): Promise<ProductPublic> {
    return ProductMapper.fromEntityToPublic(
      await this.productService.findBySlug(slug)
    )
  }

  @UseGuards(AuthGuard)
  @Mutation(() => ProductPublic, { name: 'panelUpdateProduct' })
  async updateProduct(
    @Args('input') input: ProductUpdateInput
  ): Promise<ProductPublic> {
    return ProductMapper.fromEntityToPublic(
      await this.productService.update(ProductMapper.fromUpdateToEntity(input))
    )
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean, { name: 'panelDeleteProduct' })
  async deleteProduct(@Args('id') input: string): Promise<boolean> {
    return this.productService.delete(input)
  }
}
