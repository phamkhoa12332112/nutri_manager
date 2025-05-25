import { Controller, Get, Param, Query } from '@nestjs/common';
import { MealsService } from './meals.service';

@Controller('meals')
export class MealsController {
  constructor(private mealsService: MealsService) {}

  @Get('/details/:mealId/:recipeId')
  getMealDetails(
    @Param('mealId') mealId: number,
    @Param('recipeId') recipeId: number,
  ) {
    return this.mealsService.getMealDetails(mealId, recipeId);
  }

  @Get()
  getMeals(@Query('limit') limit: number = 10) {
    return this.mealsService.getMeals(limit);
  }
}
