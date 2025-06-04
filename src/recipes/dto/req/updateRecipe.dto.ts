import { PartialType } from '@nestjs/swagger';
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
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class UpdateRecipeDto extends PartialType(CreateRecipeDto) {
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
