import { Injectable } from '@nestjs/common'
import { Product } from './product.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {}

  async create(input: Product): Promise<Product> {
    return this.productRepository.save(input)
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find()
  }

  async findById(id: string): Promise<Product> {
    return this.productRepository.findOneBy({id: id})
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
}
