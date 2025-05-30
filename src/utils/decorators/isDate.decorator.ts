import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { isISO8601, IsISO8601 } from 'class-validator';

export function IsDate(
  options: Parameters<typeof IsISO8601>[0],
  msg: string = 'Invalid date',
) {
  return applyDecorators(
    IsISO8601(options),
    Transform(({ value }) => {
      const isValidDate = isISO8601(value, {
        strict: options?.strict ?? true,
        strictSeparator: options?.strictSeparator ?? true,
      });
      if (!isValidDate) {
        throw new Error(msg);
      }
      return value as string;
    }),
  );
}
