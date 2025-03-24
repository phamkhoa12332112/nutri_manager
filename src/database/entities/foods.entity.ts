import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { MealItem } from './mealItems.entity';

@Entity('foods')
export class Food {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'double' })
  calories: number;

  @Column({ type: 'double' })
  protein: number;

  @Column({ type: 'double' })
  fat: number;

  @Column({ type: 'double' })
  carbs: number;

  @Column({ type: 'double' })
  fiber: number;

  @OneToMany(() => MealItem, (mealItem) => mealItem.food)
  mealItems: MealItem[];
}
