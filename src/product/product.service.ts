import { Injectable } from '@nestjs/common'
import { Product } from './product.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { S3 } from 'src/utils/s3'
import * as sharp from 'sharp'

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private s3: S3
  ) {}

  async create(input: Product): Promise<Product> {
    return this.productRepository.save(input)
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({
      relations: {
        category: true
      }
    })
  }

  async findById(id: string): Promise<Product> {
    return await this.productRepository.findOne({
      where: {
        id: id
      },
      relations: {
        category: true
      }
    })
  }

  async findBySlug(slug: string): Promise<Product> {
    return this.productRepository.findOne({ where: [{ slug }] })
  }

  async update(input: Product): Promise<Product> {
    await this.productRepository.update(input.id, {
      name: input.name,
      slug: input.slug,
      description: input.description,
      category: input.category
    })
    return input
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.productRepository.delete(id)
      return true
    } catch (err) {
      return false
    }
  }

  async uploadImage(
    id: string,
    createReadStream: () => any,
    filename: string,
    mimetype: string
  ): Promise<boolean> {
    const product = await this.productRepository.findOneBy({ id: id })
    if (!product) {
      return false
    }
    if (!product.images) {
      product.images = []
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
    product.images.push(url)
    await this.productRepository.update(id, {
      images: product.images
    })
    return true
  }

  async deleteImage(id: string, url: string): Promise<boolean> {
    const product = await this.productRepository.findOneBy({ id: id })
    if (!product) {
      return false
    }
    if (!product.images) {
      product.images = []
    }

    const filenameParts = url.split('.com/')
    const filename = filenameParts[filenameParts.length - 1].replaceAll(
      '%20',
      ' '
    )
    await this.s3.deleteObject('devshop-bfccardoso', filename)

    product.images = product.images.filter(imgUrl => imgUrl !== url)
    await this.productRepository.update(product.id, {
      images: product.images
    })
    return true
  }
}
