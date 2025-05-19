import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Meal } from './meals.entity';
import { Ingredient } from './ingredients.entity';
import { Recipes } from './recipes.entity';

@Entity('meal_items')
export class MealItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  quantity: number;

  @ManyToOne(() => Meal, (meal) => meal.items)
  meal: Meal;

  @ManyToOne(() => Recipes, (recipe) => recipe.mealItems)
  recipe: Recipes;
}
