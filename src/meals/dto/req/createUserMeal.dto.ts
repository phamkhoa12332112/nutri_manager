import { IsNotEmpty, IsNumber } from 'class-validator';
import { IsDate } from 'src/utils/decorators/isDate.decorator';

export class CreateUserMealDto {
  @IsNumber()
  @IsNotEmpty()
  mealId: number;

  @IsNumber()
  @IsNotEmpty()
  recipeId: number;

  @IsDate(
    { strict: true, strictSeparator: true },
    `Property "mealTime" should be a valid ISO8601 date string`,
  )
  @IsNotEmpty()
  mealTime: Date;
}
