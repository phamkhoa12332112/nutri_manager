import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meal, MealItem, Recipes } from 'src/database/entities';
import { MealsController } from './meals.controller';
import { MealsService } from './meals.service';

@Module({
  imports: [TypeOrmModule.forFeature([Meal, Recipes, MealItem])],
  controllers: [MealsController],
  providers: [MealsService],
})
export class MealsModule {}
