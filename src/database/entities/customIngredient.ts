import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Ingredient } from './ingredients.entity';

@Entity('custom_ingredients')
export class CustomIngredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'double', nullable: true })
  calories: number;

  @Column({ type: 'double', nullable: true })
  protein: number;

  @Column({ type: 'double', nullable: true })
  fat: number;

  @Column({ type: 'double', nullable: true })
  carbs: number;

  @Column({ type: 'double', nullable: true })
  fiber: number;

  @Column({ type: 'varchar', nullable: true })
  unit: string;

  @Column({ type: 'integer' })
  userId: number;

  @Column({ type: 'integer' })
  recipeId: number;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.custom)
  ingredient: Ingredient;
}
