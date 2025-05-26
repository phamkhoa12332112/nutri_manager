import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './users.entity';
import { MealItem } from './mealItems.entity';

@Entity('detail_meals')
export class DetailMeals {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime' })
  mealTime: Date;

  @ManyToOne(() => User, (user) => user.meals)
  user: User;

  @OneToOne(() => MealItem)
  @JoinColumn()
  mealItem: MealItem;
}
