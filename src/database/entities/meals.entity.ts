import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './users.entity';
import { MealItem } from './mealItems.entity';

@Entity('meals')
export class Meal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @ManyToOne(() => User, (user) => user.meals)
  user: User;

  @OneToMany(() => MealItem, (mealItem) => mealItem.meal)
  items: MealItem[];
}
