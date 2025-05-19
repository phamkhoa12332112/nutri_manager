import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Meal } from './meals.entity';
import { GoalTracking } from './goalTracking.entity';
import { DailyIntake } from './dailyIntake.entity';
import { Moods } from './moods.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'integer' })
  age: number;

  @Column({ type: 'bit' })
  gender: boolean;

  @Column({ type: 'double' })
  weight: number;

  @Column({ type: 'double' })
  height: number;

  @Column({ type: 'double' })
  dailyCaloriesGoal: number;

  @OneToMany(() => Meal, (meal) => meal.user)
  meals: Meal[];

  @OneToMany(() => DailyIntake, (dailyIntake) => dailyIntake.user)
  dailyIntakes: DailyIntake[];

  @OneToMany(() => GoalTracking, (goalTracking) => goalTracking.user)
  goalTrackings: GoalTracking[];

  @OneToMany(() => Moods, (mood) => mood.user)
  moods: Moods[];
}
