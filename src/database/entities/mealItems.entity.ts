import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Meal } from './meals.entity';
import { Recipes } from './recipes.entity';
import { DetailMeals } from './detailMeal.entity';

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

  @OneToMany(() => DetailMeals, (detail) => detail.mealItem)
  detailMeals: DetailMeals[];
}
