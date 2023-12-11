import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'
import { BrandService } from '../brand.service'

@ValidatorConstraint({ name: 'brandSlugIsUnique', async: true })
export class BrandSlugIsUnique implements ValidatorConstraintInterface {
  constructor(private readonly brandService: BrandService) {}
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
    const brand = await this.brandService.findBySlug(text)
    if (brand) {
      if (id) {
        if (brand.id === id) return true
      }
      return false
    }
    return true
  }
  defaultMessage(): string {
    return 'Slug must be unique'
  }
}
