import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  User,
  DailyIntake,
  GoalTracking,
  Meal,
  MealItem,
  Ingredient,
  RecipeItems,
  Recipes,
  MoodRecommendItems,
  Moods,
  DetailMeals,
} from 'src/database/entities';
import { CustomIngredient } from './entities/customIngredient';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: '',
      database: 'health',
      logging: true,
      entities: [
        User,
        Meal,
        MealItem,
        GoalTracking,
        DailyIntake,
        Ingredient,
        RecipeItems,
        Recipes,
        MoodRecommendItems,
        Moods,
        DetailMeals,
        CustomIngredient,
      ],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
