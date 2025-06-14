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

  @ManyToOne(() => Meal, (meal) => meal.items, { onDelete: 'CASCADE' })
  meal: Meal;

  @ManyToOne(() => Recipes, (recipe) => recipe.mealItems, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  recipe: Recipes;

  @OneToMany(() => DetailMeals, (detail) => detail.mealItem)
  detailMeals: DetailMeals[];
}
