import {
  IsBoolean,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsNumber()
  @IsPositive()
  age: number;

  @IsBoolean()
  gender: boolean;

  @IsNumber()
  weight: number;

  @IsNumber()
  height: number;

  @IsNumber()
  dailyCaloriesGoal: number;
}
