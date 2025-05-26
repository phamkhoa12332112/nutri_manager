import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { MealsService } from './meals.service';
import { CreateUserMealDto } from './dto/req/createUserMeal.dto';

@Controller('meals')
export class MealsController {
  constructor(private mealsService: MealsService) {}

  @Post('/user/create/:userId')
  create(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() detail: CreateUserMealDto,
  ) {
    return this.mealsService.createUserMeal(userId, detail);
  }

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
