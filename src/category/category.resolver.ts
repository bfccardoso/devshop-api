import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { CategoryPublic } from './dto/category'
import { CategoryService } from './category.service'
import { CategoryCreateInput } from './dto/category-create.input'
import { CategoryMapper } from './category.mapper'
import { CategoryUpdateInput } from './dto/category-update.input'

@Resolver(() => CategoryPublic)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}
  @Query(() => [CategoryPublic], { name: 'getAllCategories' })
  async getAllCategories(): Promise<CategoryPublic[]> {
    return await this.categoryService.findAll()
  }

  @Query(() => CategoryPublic, { name: 'getCategoryById' })
  async getCategoryById(@Args('id') id: string): Promise<CategoryPublic> {
    return await this.categoryService.findById(id)
  }

  @Mutation(() => CategoryPublic, { name: 'createCategory' })
  async createCategory(
    @Args('input') input: CategoryCreateInput
  ): Promise<CategoryPublic> {
    return this.categoryService.create(CategoryMapper.toEntity(input))
  }

  @Mutation(() => CategoryPublic, { name: 'updateCategory' })
  async updateCategory(
    @Args('input') input: CategoryUpdateInput
  ): Promise<CategoryPublic> {
    return this.categoryService.update(input)
  }

  @Mutation(() => Boolean, { name: 'deleteCategory' })
  async deleteCategory(@Args('id') input: string): Promise<boolean> {
    return this.categoryService.delete(input)
  }
}
