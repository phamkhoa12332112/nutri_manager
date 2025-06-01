import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { MealsService } from './meals.service';
import { CreateUserMealDto } from './dto/req/createUserMeal.dto';
import { CreateMealDto } from './dto/req/createMeal.dto';
import { UpdateMealDto } from './dto/req/updateMeal.dto';
import { DeleteMealsDto } from './dto/req/deleteMeals.dto';
import { UpdateUserIngredientDto } from './dto/req/updateUserIngredient.dto';
import { DetailsQuery } from './dto/query/details.query';

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

  @Delete('/user/delete/:userId/:detailId')
  delete(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('detailId', ParseIntPipe) detailId: number,
  ) {
    return this.mealsService.deleteUserMeal(userId, detailId);
  }

  @Patch('/user/ingredient/:userId')
  updateIngredient(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() ingredient: UpdateUserIngredientDto,
  ) {
    return this.mealsService.updateUserIngredient(userId, ingredient);
  }

  @Get('/user/details/:userId')
  getUserMeals(
    @Param('userId', ParseIntPipe) userId: number,
    @Query(
      new ValidationPipe({
        transform: true,
      }),
    )
    query: DetailsQuery,
  ) {
    return this.mealsService.getUserMeals(userId, query);
  }

  @Get('/details/:mealId/:recipeId')
  getMealDetails(
    @Param('mealId') mealId: number,
    @Param('recipeId') recipeId: number,
    @Query('userId') userId: number,
  ) {
    return this.mealsService.getMealDetails(mealId, recipeId, userId);
  }

  @Get('/ingredients')
  getIngredients() {
    return this.mealsService.getIngredients();
  }

  // ADMIN ONLY

  @Post()
  createMeal(@Body() meal: CreateMealDto) {
    return this.mealsService.createMeal(meal);
  }

  @Patch('/:mealId')
  updateMeal(
    @Param('mealId', ParseIntPipe) mealId: number,
    @Body() meal: UpdateMealDto,
  ) {
    return this.mealsService.updateMeal(mealId, meal);
  }

  @Delete()
  deleteMeals(@Body() meals: DeleteMealsDto) {
    return this.mealsService.deleteMeals(meals);
  }

  @Get()
  getMeals(@Query('limit') limit: number = 10) {
    return this.mealsService.getMeals(limit);
  }
}
