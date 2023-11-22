import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { CategoryPublic } from './dto/category'
import { CategoryService } from './category.service'
import { CategoryCreateInput } from './dto/category-create.input'
import { CategoryMapper } from './category.mapper'

@Resolver(() => CategoryPublic)
export class CategoryResolver{
  constructor(private readonly categoryService: CategoryService){}
  @Query(() => [CategoryPublic], { name: 'getAllCategories'})
  async getAllCategories(): Promise<CategoryPublic[]>{
    return await this.categoryService.findAll()
  }

  @Mutation(() => CategoryPublic, { name: 'createCategory' })
  async createCategory(
    @Args('input') input: CategoryCreateInput
  ): Promise<CategoryPublic> {
    return this.categoryService.create(CategoryMapper.toEntity(input))
  }
}