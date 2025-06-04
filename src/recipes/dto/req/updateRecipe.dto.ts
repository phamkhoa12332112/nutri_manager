import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateRecipeDto } from './createRecipe.dto';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class IngredientItem {
  @IsOptional()
  @IsNumber()
  quantity: number = 1;

  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class UpdateRecipeDto extends PartialType(
  OmitType(CreateRecipeDto, ['meals', 'ingredients']),
) {
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => IngredientItem)
  ingredients: IngredientItem[];

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  mealIds: number[];
}
