import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DetailMeals,
  Ingredient,
  Meal,
  MealItem,
  RecipeItems,
  Recipes,
} from 'src/database/entities';
import { MealsController } from './meals.controller';
import { MealsService } from './meals.service';
import { CustomIngredient } from 'src/database/entities/customIngredient';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Meal,
      Recipes,
      MealItem,
      RecipeItems,
      Ingredient,
      DetailMeals,
      CustomIngredient,
    ]),
  ],
  controllers: [MealsController],
  providers: [MealsService],
})
export class MealsModule {}
