import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './users.entity';
import { MoodRecommendItems } from './moodRecommendItems.entity';

@Entity('moods')
export class Moods {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  moodName: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'timestamp' })
  recordedAt: Date;

  @ManyToOne(() => User, (user) => user.goalTrackings)
  user: User;

  @ManyToOne(
    () => MoodRecommendItems,
    (moodRecommendItem) => moodRecommendItem.mood,
  )
  moodRecommendItems: MoodRecommendItems[];
}
