import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateRecipeDto } from './createRecipe.dto';
import { ArrayMinSize, IsArray, IsOptional } from 'class-validator';

export class UpdateRecipeDto extends PartialType(
  OmitType(CreateRecipeDto, ['meals', 'ingredients']),
) {
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  ingredientIds: number[];

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  mealIds: number[];
}
