import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './users.entity';

@Entity('goal_trackings')
export class GoalTracking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  intakeDate: Date;

  @Column({ type: 'double' })
  dailyCaloriesGoal: number;

  @Column({ type: 'double' })
  totalCalories: number;

  @Column({ type: 'bit' })
  goalStatus: boolean;

  @ManyToOne(() => User, (user) => user.goalTrackings)
  user: User;
}
