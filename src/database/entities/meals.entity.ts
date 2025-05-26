import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { MealItem } from './mealItems.entity';

@Entity('meals')
export class Meal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(() => MealItem, (mealItem) => mealItem.meal)
  items: MealItem[];
}
