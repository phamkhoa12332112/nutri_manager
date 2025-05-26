import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { RecipeItems } from './recipeItems.entity';
import { MoodRecommendItems } from './moodRecommendItems.entity';

@Entity('ingredients')
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'double' })
  calories: number;

  @Column({ type: 'varchar' })
  category: string;

  @Column({ type: 'double' })
  protein: number;

  @Column({ type: 'double' })
  fat: number;

  @Column({ type: 'double' })
  carbs: number;

  @Column({ type: 'double' })
  fiber: number;

  @Column({ type: 'varchar' })
  unit: string;

  @Column({ type: 'varchar' })
  imageUrl: string;

  @OneToMany(() => RecipeItems, (recipeItems) => recipeItems.ingredient)
  recipeItems: RecipeItems[];

  @OneToMany(
    () => MoodRecommendItems,
    (moodRecommendItem) => moodRecommendItem.ingredient,
  )
  moodRecommendItems: MoodRecommendItems[];
}
