import { PartialType } from '@nestjs/swagger';
import { CreateIngredientDto } from './createIngredient.dto';

export class UpdateIngredientDto extends PartialType(CreateIngredientDto) {}
