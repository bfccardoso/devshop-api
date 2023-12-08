import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'
import { CategoryService } from '../category.service'

@ValidatorConstraint({ name: 'categorySlugIsUnique', async: true })
export class CategorySlugIsUnique implements ValidatorConstraintInterface {
  constructor(private readonly categoryService: CategoryService) {}
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
    const category = await this.categoryService.findBySlug(text)
    if (category) {
      if (id) {
        if (category.id === id) return true
      }
      return false
    }
    return true
  }
  defaultMessage(): string {
    return 'Slug must be unique'
  }
}
