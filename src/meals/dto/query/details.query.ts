import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { IsDate } from 'src/utils/decorators/isDate.decorator';

export class DetailsQuery {
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  limit: number = 10;

  @IsOptional()
  @IsDate(
    { strict: true, strictSeparator: true },
    'Property date should be a valid ISO8601 date string',
  )
  date: string = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();
}
