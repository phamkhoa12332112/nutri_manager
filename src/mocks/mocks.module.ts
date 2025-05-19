import { Module } from '@nestjs/common';
import { MocksService } from './mocks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  User,
  DailyIntake,
  Ingredient,
  GoalTracking,
  Meal,
  MealItem,
} from 'src/database/entities';
import { MocksController } from './mocks.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Ingredient,
      DailyIntake,
      GoalTracking,
      MealItem,
      Meal,
    ]),
  ],
  controllers: [MocksController],
  providers: [MocksService],
})
export class MocksModule {}
