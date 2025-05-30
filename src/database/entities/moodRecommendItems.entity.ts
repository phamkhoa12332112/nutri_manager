import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Moods } from './moods.entity';
import { Recipes } from './recipes.entity';
import { Meal } from './meals.entity';

@Entity('mood_recommend_items')
export class MoodRecommendItems {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Moods, (mood) => mood.moodRecommendItems, {
    onDelete: 'CASCADE',
  })
  mood: Moods;

  @ManyToOne(() => Recipes, (recipe) => recipe.moodRecommendItems)
  recipe: Recipes;

  @ManyToOne(() => Meal, (meal) => meal.moodRecommendItems)
  meal: Meal;
}
