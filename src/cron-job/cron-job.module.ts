import { Module } from '@nestjs/common';
import { CronJobService } from './cron-job.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DetailMeals,
  GoalTracking,
  Recipes,
  User,
} from 'src/database/entities';
import { CronJobController } from './cron-job.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, GoalTracking, DetailMeals, Recipes]),
  ],
  controllers: [CronJobController],
  providers: [CronJobService],
})
export class CronJobModule {}
