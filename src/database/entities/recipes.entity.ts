import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RecipeItems } from './recipeItems.entity';
import { MealItem } from './mealItems.entity';
import { MoodRecommendItems } from './moodRecommendItems.entity';

@Entity('recipes')
export class Recipes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'double' })
  totalCalories: number;

  @Column({ type: 'varchar' })
  imageUrl: string;

  @OneToMany(() => RecipeItems, (recipeItems) => recipeItems.recipe, {
    cascade: ['insert', 'update'],
  })
  items: RecipeItems[];

  @OneToMany(() => MealItem, (mealItems) => mealItems.recipe, {
    cascade: ['insert', 'update'],
  })
  mealItems: MealItem[];

  @OneToMany(
    () => MoodRecommendItems,
    (moodRecommendItem) => moodRecommendItem.recipe,
  )
  moodRecommendItems: MoodRecommendItems[];
}
