import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
  ValidateNested,
} from 'class-validator';

class IngredientItem {
  @IsOptional()
  @IsNumber()
  quantity: number = 1;

  @IsNotEmpty()
  @IsNumber()
  id: number;
}

class mealItem {
  @IsOptional()
  @IsNumber()
  quantity: number = 1;

  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class CreateRecipeDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  totalCalories: number;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  imageUrl: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => IngredientItem)
  ingredients: IngredientItem[];

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => mealItem)
  meals: mealItem[];
}
