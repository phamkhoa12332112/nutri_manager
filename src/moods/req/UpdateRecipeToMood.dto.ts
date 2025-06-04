import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';

export class MealAndMoodIdDto {
  @IsNumber()
  @IsNotEmpty()
  mealId: number;

  @IsNumber()
  @IsNotEmpty()
  moodId: number;
}

export class UpdateRecipeToMoodDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => MealAndMoodIdDto)
  update: MealAndMoodIdDto[];
}
