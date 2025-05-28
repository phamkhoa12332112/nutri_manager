import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { GoalTracking } from './goalTracking.entity';
import { DailyIntake } from './dailyIntake.entity';
import { DetailMeals } from './detailMeal.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
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

  @OneToMany(() => DetailMeals, (detail) => detail.user)
  meals: DetailMeals[];

  @OneToMany(() => DailyIntake, (dailyIntake) => dailyIntake.user)
  dailyIntakes: DailyIntake[];

  @OneToMany(() => GoalTracking, (goalTracking) => goalTracking.user)
  goalTrackings: GoalTracking[];
}
