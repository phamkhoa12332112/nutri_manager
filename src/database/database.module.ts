import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  User,
  DailyIntake,
  Food,
  GoalTracking,
  Meal,
  MealItem,
} from 'src/database/entities';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'health',
      entities: [User, Meal, MealItem, GoalTracking, DailyIntake, Food],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
