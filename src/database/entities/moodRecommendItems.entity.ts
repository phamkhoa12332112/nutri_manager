import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Moods } from './moods.entity';
import { Recipes } from './recipes.entity';
import { Ingredient } from './ingredients.entity';

@Entity('mood_recommend_items')
export class MoodRecommendItems {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Moods, (mood) => mood.moodRecommendItems)
  mood: Moods;

  @ManyToOne(() => Recipes, (recipe) => recipe.moodRecommendItems)
  recipe: Recipes;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.moodRecommendItems)
  ingredient: Ingredient;
}
