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

  @Column({ type: 'integer', nullable: true })
  age: number;

  @Column({ type: 'bool', nullable: true })
  gender: boolean;

  @Column({ type: 'double', nullable: true })
  weight: number;

  @Column({ type: 'double', nullable: true })
  weightGoal: number;

  @Column({ type: 'double', nullable: true })
  height: number;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  userId: string;

  @Column({ type: 'double', nullable: true })
  dailyCaloriesGoal: number;

  @Column({ type: 'double', nullable: true })
  levelExercise: number;

  @OneToMany(() => Meal, (meal) => meal.user)
  meals: Meal[];

  @OneToMany(() => DailyIntake, (dailyIntake) => dailyIntake.user)
  dailyIntakes: DailyIntake[];

  @OneToMany(() => GoalTracking, (goalTracking) => goalTracking.user)
  goalTrackings: GoalTracking[];

  @OneToMany(() => Moods, (mood) => mood.user)
  moods: Moods[];
}
