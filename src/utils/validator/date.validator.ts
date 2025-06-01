import { IsOptional } from 'class-validator';
import { IsDate } from '../decorators/isDate.decorator';

export class DateValidate {
  @IsDate(
    { strict: true, strictSeparator: true },
    `Property "date" should be a valid ISO8601 date string`,
  )
  date: Date;
}

export class QueryDateValidate {
  @IsDate(
    { strict: true, strictSeparator: true },
    `Property "date" should be a valid ISO8601 date string`,
  )
  @IsOptional()
  date?: Date;
}
