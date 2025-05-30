import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './users.entity';
import { MealItem } from './mealItems.entity';

@Entity('detail_meals')
export class DetailMeals {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime' })
  mealTime: Date;

  @ManyToOne(() => User, (user) => user.meals, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => MealItem, (mealItem) => mealItem.detailMeals, {
    onDelete: 'CASCADE',
  })
  mealItem: MealItem;
}
