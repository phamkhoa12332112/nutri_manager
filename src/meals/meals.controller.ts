import { Controller, Get, Query } from '@nestjs/common';
import { MealsService } from './meals.service';

@Controller('meals')
export class MealsController {
  constructor(private mealsService: MealsService) {}

  @Get()
  getMeals(@Query('limit') limit: number = 10) {
    return this.mealsService.getMeals(limit);
  }
}
