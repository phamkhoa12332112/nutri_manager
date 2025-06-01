import { applyDecorators } from '@nestjs/common';
import { IsISO8601 } from 'class-validator';

export function IsDate(
  options: Parameters<typeof IsISO8601>[0],
  msg: string = 'Invalid date',
) {
  return applyDecorators(IsISO8601(options, { message: msg }));
}
