import { IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @MinLength(3)
  email: string;

  @IsString()
  @MinLength(3)
  userId: string;
}
