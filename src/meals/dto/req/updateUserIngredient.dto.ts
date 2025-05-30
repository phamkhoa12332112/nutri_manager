import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateUserIngredientDto {
  @IsOptional()
  @IsNumber()
  calories: number;

  @IsOptional()
  @IsNumber()
  protein: number;

  @IsOptional()
  @IsNumber()
  fat: number;

  @IsOptional()
  @IsNumber()
  carbs: number;

  @IsOptional()
  @IsNumber()
  fiber: number;

  @IsOptional()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  recipeId: number;

  @IsNotEmpty()
  @IsNumber()
  ingredientId: number;
}
