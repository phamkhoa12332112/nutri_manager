import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @MinLength(3)
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  age?: number;

  @IsBoolean()
  @IsOptional()
  gender?: boolean;

  @IsNumber()
  @IsOptional()
  weight?: number;

  @IsNumber()
  @IsOptional()
  weightGoal?: number;

  @IsNumber()
  @IsOptional()
  height?: number;

  @IsNumber()
  @IsOptional()
  dailyCaloriesGoal?: number;

  @IsNumber()
  @IsOptional()
  levelExercise?: number;

  @IsString()
  @MinLength(3)
  userId: string;
}
