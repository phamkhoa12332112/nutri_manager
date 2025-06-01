import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Ingredient,
  Meal,
  MealItem,
  RecipeItems,
  Recipes,
} from 'src/database/entities';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Recipes,
      Ingredient,
      Meal,
      RecipeItems,
      MealItem,
    ]),
  ],
  controllers: [RecipeController],
  providers: [RecipeService],
})
export class RecipeModule {}
