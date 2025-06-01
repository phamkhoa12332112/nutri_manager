import { ArrayMinSize, IsArray, IsNumber } from 'class-validator';

export class DeleteIngredientsDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  ids: number[];
}
