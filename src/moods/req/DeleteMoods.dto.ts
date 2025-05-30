import { ArrayMinSize, IsArray, IsNumber } from 'class-validator';

export class DeleteMoodsDto {
  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMinSize(1)
  ids: number[];
}
