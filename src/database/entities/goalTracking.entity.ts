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

  @Column({ type: 'varchar' })
  goalStatus: string;

  @ManyToOne(() => User, (user) => user.goalTrackings, { onDelete: 'CASCADE' })
  user: User;
}
