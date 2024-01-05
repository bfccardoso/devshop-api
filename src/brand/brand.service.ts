import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Brand } from './brand.entity'
import { Repository } from 'typeorm'
import { S3 } from 'src/utils/s3'
import * as sharp from 'sharp'

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
    private s3: S3
  ) {}

  async findAll(): Promise<Brand[]> {
    return this.brandRepository.find()
  }

  async findById(id: string): Promise<Brand> {
    return this.brandRepository.findOneBy({ id: id })
  }

  async findBySlug(slug: string): Promise<Brand> {
    return this.brandRepository.findOne({ where: [{ slug }] })
  }

  async create(input: Brand): Promise<Brand> {
    return this.brandRepository.save(input)
  }

  async uploadLogo(
    id: string,
    createReadStream: () => any,
    filename: string,
    mimetype: string
  ): Promise<boolean> {
    const brand = await this.brandRepository.findOneBy({ id: id })
    if (!brand) {
      return false
    }
    if (brand.logo) {
      const filename = brand.logo.split('.com/')[1].replaceAll('%20', ' ')
      await this.s3.deleteObject('devshop-bfccardoso', filename)
    }
    /*
      Aqui estamos subindo a imagem redimensionada para 300px, o ideal
      seria subir duas imagens, a original e a redimensionada.
    */
    const stream = createReadStream().pipe(sharp().resize(300))
    const url = await this.s3.upload(
      stream,
      mimetype,
      'devshop-bfccardoso',
      id + '-' + filename
    )
    await this.brandRepository.update(id, {
      logo: url
    })
    return true
  }

  async removeBrandLogo(id: string): Promise<boolean> {
    const brand = await this.brandRepository.findOneBy({ id: id })
    const filename = brand.logo.split('.com/')[1].replaceAll('%20', ' ')
    await this.s3.deleteObject('devshop-bfccardoso', filename)
    await this.brandRepository.update(brand.id, {
      logo: null
    })
    return true
  }

  async update(input: Brand): Promise<Brand> {
    await this.brandRepository.update(input.id, {
      name: input.name,
      slug: input.slug
    })
    return input
  }

  async delete(id: string): Promise<boolean> {
    try {
      const brand = await this.brandRepository.findOneBy({ id: id })
      if (!brand) {
        return false
      }
      if (brand.logo) {
        const filename = brand.logo.split('.com/')[1].replaceAll('%20', ' ')
        await this.s3.deleteObject('devshop-bfccardoso', filename)
      }
      await this.brandRepository.delete(id)
      return true
    } catch (err) {
      return false
    }
  }
}
