import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Recipes } from './recipes.entity';
import { Ingredient } from './ingredients.entity';

@Entity('recipeItems')
export class RecipeItems {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  quantity: number;

  @ManyToOne(() => Recipes, (recipe) => recipe.items)
  recipe: Recipes;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.recipeItems)
  ingredient: Ingredient;
}
