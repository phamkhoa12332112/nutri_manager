import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './users.entity';

@Entity('daily_intakes')
export class DailyIntake {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  intakeDate: Date;

  @Column({ type: 'double' })
  totalCalories: number;

  @Column({ type: 'double' })
  totalProtein: number;

  @Column({ type: 'double' })
  totalFat: number;

  @Column({ type: 'double' })
  totalCarbs: number;

  @Column({ type: 'double' })
  totalFiber: number;

  @ManyToOne(() => User, (user) => user.dailyIntakes)
  user: User;
}
