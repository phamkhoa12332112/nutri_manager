import { Transform } from 'class-transformer';
import { IsISO8601, isISO8601, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserMealDto {
  @IsNumber()
  @IsNotEmpty()
  mealId: number;

  @IsNumber()
  @IsNotEmpty()
  recipeId: number;

  @IsISO8601({ strict: true, strictSeparator: true })
  @Transform(({ value }) => {
    const isValidDate = isISO8601(value, {
      strict: true,
      strictSeparator: true,
    });
    if (!isValidDate) {
      throw new Error(
        `Property "from_date" should be a valid ISO8601 date string`,
      );
    }
    return value as string;
  })
  @IsNotEmpty()
  mealTime: Date;
}
