import { Expose, Transform, Type } from 'class-transformer';
import { RecipeItems } from 'src/database/entities';

export interface RecipeItemQuery {
  rid: number;
  rQuantity: number;
}

export class IngredientMapper {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  calories: number;

  @Expose()
  protein: number;

  @Expose()
  fat: number;

  @Expose()
  carbs: number;

  @Expose()
  fiber: number;

  @Expose()
  unit: string;

  @Expose()
  imageUrl: string;

  @Expose()
  @Transform(
    ({ obj }: { obj: RecipeItemQuery }) => {
      const recipeItem = { id: obj.rid, quantity: obj.rQuantity };
      return recipeItem;
    },
    { toClassOnly: true },
  )
  @Type(() => RecipeItems)
  recipeItem: RecipeItems;
}
