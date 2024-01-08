import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { CategoryPublic } from './dto/category'
import { CategoryService } from './category.service'
import { CategoryCreateInput } from './dto/category-create.input'
import { CategoryMapper } from './category.mapper'
import { CategoryUpdateInput } from './dto/category-update.input'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/utils/jwt-auth.guard'

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

  @Query(() => CategoryPublic, { name: 'getCategoryBySlug' })
  async getCategoryBySlug(@Args('slug') slug: string): Promise<CategoryPublic> {
    return await this.categoryService.findBySlug(slug)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => CategoryPublic, { name: 'panelCreateCategory' })
  async createCategory(
    @Args('input') input: CategoryCreateInput
  ): Promise<CategoryPublic> {
    return this.categoryService.create(CategoryMapper.toEntity(input))
  }

  @UseGuards(AuthGuard)
  @Mutation(() => CategoryPublic, { name: 'panelUpdateCategory' })
  async updateCategory(
    @Args('input') input: CategoryUpdateInput
  ): Promise<CategoryPublic> {
    return this.categoryService.update(input)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean, { name: 'panelDeleteCategory' })
  async deleteCategory(@Args('id') input: string): Promise<boolean> {
    return this.categoryService.delete(input)
  }
}
