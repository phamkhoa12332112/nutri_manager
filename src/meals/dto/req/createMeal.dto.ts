import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateMealDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  name: string;
}
