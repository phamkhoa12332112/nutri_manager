import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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

  @OneToMany(
    () => MoodRecommendItems,
    (moodRecommendItem) => moodRecommendItem.mood,
  )
  moodRecommendItems: MoodRecommendItems[];
}
