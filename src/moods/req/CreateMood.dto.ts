import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { IsDate } from 'src/utils/decorators/isDate.decorator';

export class CreateMoodDto {
  @IsNotEmpty()
  @MinLength(1)
  moodName: string;

  @IsOptional()
  @MinLength(1)
  description: string;

  @IsDate(
    { strict: true, strictSeparator: true },
    `Property "recordedAt" should be a valid ISO8601 date string`,
  )
  @IsNotEmpty()
  recordedAt: Date;
}
