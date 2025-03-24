import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { DailyIntake } from './entities/dailyIntake.entity';
import { Food } from './entities/foods.entity';
import { GoalTracking } from './entities/goalTracking.entity';
import { MealItem } from './entities/mealItems.entity';
import { Meal } from './entities/meals.entity';

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
