import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @ManyToOne(
    () => MoodRecommendItems,
    (moodRecommendItem) => moodRecommendItem.mood,
  )
  moodRecommendItems: MoodRecommendItems[];
}
