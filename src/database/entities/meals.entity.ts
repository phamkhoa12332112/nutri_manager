import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { MealItem } from './mealItems.entity';
import { MoodRecommendItems } from './moodRecommendItems.entity';

@Entity('meals')
export class Meal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(() => MealItem, (mealItem) => mealItem.meal)
  items: MealItem[];

  @OneToMany(
    () => MoodRecommendItems,
    (moodRecommendItem) => moodRecommendItem.meal,
  )
  moodRecommendItems: MoodRecommendItems[];
}
