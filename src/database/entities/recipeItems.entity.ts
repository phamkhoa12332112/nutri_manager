import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Recipes } from './recipes.entity';
import { Ingredient } from './ingredients.entity';

@Entity('recipe_items')
export class RecipeItems {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  quantity: number;

  @ManyToOne(() => Recipes, (recipe) => recipe.items, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  recipe: Recipes;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.recipeItems, {
    onDelete: 'CASCADE',
  })
  ingredient: Ingredient;
}
