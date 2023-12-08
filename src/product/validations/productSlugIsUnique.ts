import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'
import { ProductService } from '../product.service'


@ValidatorConstraint({ name: 'productSlugIsUnique', async: true })
export class ProductSlugIsUnique implements ValidatorConstraintInterface {
  constructor(private readonly productService: ProductService) {}
  async validate(
    text: string,
    validationArguments: ValidationArguments
  ): Promise<boolean> {
    console.log(
      'validate',
      text,
      validationArguments,
      validationArguments.object
    )
    const id = validationArguments.object['id']
    const product = await this.productService.findBySlug(text)
    if (product) {
      if (id) {
        if (product.id === id) return true
      }
      return false
    }
    return true
  }
  defaultMessage(): string {
    return 'Slug must be unique'
  }
}
