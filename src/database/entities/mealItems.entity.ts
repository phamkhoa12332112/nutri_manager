import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Meal } from './meals.entity';
import { Food } from './foods.entity';

@Entity('meal_items')
export class MealItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  quantity: number;

  @ManyToOne(() => Meal, (meal) => meal.items)
  meal: Meal;

  @ManyToOne(() => Food, (food) => food.mealItems)
  food: Food;
}
