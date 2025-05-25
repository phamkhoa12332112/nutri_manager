import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  email: string;

  @IsString()
  @MinLength(3)
  userId: string;
}
