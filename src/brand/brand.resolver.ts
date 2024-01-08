import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { BrandPublic } from './dto/brand'
import { BrandService } from './brand.service'
import { BrandCreateInput } from './dto/brand-create.input'
import { BrandMapper } from './brand.mapper'
import { BrandUpdateInput } from './dto/brand-update.input'
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js'
import * as FileUpload from 'graphql-upload/Upload.js'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/utils/jwt-auth.guard'

@Resolver(() => BrandPublic)
export class BrandResolver {
  constructor(private readonly brandService: BrandService) {}

  @Query(() => [BrandPublic], { name: 'getAllBrands' })
  async getAllBrands(): Promise<BrandPublic[]> {
    return await this.brandService.findAll()
  }

  @Query(() => BrandPublic, { name: 'getBrandById' })
  async getBrandById(@Args('id') id: string): Promise<BrandPublic> {
    return await this.brandService.findById(id)
  }

  @Query(() => BrandPublic, { name: 'getBrandBySlug' })
  async getBrandBySlug(@Args('slug') slug: string): Promise<BrandPublic> {
    return await this.brandService.findBySlug(slug)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => BrandPublic, { name: 'panelCreateBrand' })
  async createBrand(
    @Args('input') input: BrandCreateInput
  ): Promise<BrandPublic> {
    return this.brandService.create(BrandMapper.toEntity(input))
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean, { name: 'panelUploadBrandLogo' })
  async uploadBrandLogo(
    @Args('id') id: string,
    @Args('file', { type: () => GraphQLUpload })
    file: FileUpload
  ): Promise<boolean> {
    const { createReadStream, filename, mimetype } = file
    return this.brandService.uploadLogo(
      id,
      createReadStream,
      filename,
      mimetype
    )
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean, { name: 'panelRemoveBrandLogo' })
  async removeLogo(@Args('id') id: string): Promise<boolean> {
    return this.brandService.removeBrandLogo(id)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => BrandPublic, { name: 'panelUpdateBrand' })
  async updateBrand(
    @Args('input') input: BrandUpdateInput
  ): Promise<BrandPublic> {
    return BrandMapper.fromEntityToPublic(
      await this.brandService.update(BrandMapper.fromUpdateToEntity(input))
    )
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean, { name: 'panelDeleteBrand' })
  async deleteBrand(@Args('id') input: string): Promise<boolean> {
    return this.brandService.delete(input)
  }
}
