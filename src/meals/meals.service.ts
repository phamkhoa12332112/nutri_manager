import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DetailMeals,
  Ingredient,
  Meal,
  MealItem,
  Recipes,
} from 'src/database/entities';
import { Repository } from 'typeorm';
import { CreateUserMealDto } from './dto/req/createUserMeal.dto';

@Injectable()
export class MealsService {
  constructor(
    @InjectRepository(Meal) private mealRepository: Repository<Meal>,
    @InjectRepository(Recipes) private recipeRepository: Repository<Recipes>,
    @InjectRepository(MealItem)
    private mealItemRepository: Repository<MealItem>,
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
    @InjectRepository(DetailMeals)
    private detailMealRepository: Repository<DetailMeals>,
  ) {}

  async createUserMeal(userId: number, detail: CreateUserMealDto) {
    const mealItem = await this.mealItemRepository.findOne({
      where: { meal: { id: detail.mealId }, recipe: { id: detail.recipeId } },
    });
    if (!mealItem) {
      return {
        msg: `No meal with id ${detail.mealId} & recipe id ${detail.recipeId}`,
        stateCode: 400,
        data: null,
      };
    }
    const isExist = await this.detailMealRepository.findOne({
      where: {
        user: { id: userId },
        mealItem: { id: mealItem.id },
      },
    });
    if (isExist) {
      return {
        msg: 'User already has this meal',
        stateCode: 400,
        data: null,
      };
    }
    const newDetailMeal = this.detailMealRepository.create({
      mealTime: new Date(),
      user: { id: userId },
      mealItem: { id: mealItem.id },
    });

    const rs = await this.detailMealRepository.save(newDetailMeal);

    return { msg: 'Create user meal successfully', stateCode: 200, data: rs };
  }

  async deleteUserMeal(userId: number, detailId: number) {
    const detailMeal = await this.detailMealRepository.findOne({
      where: { id: detailId, user: { id: userId } },
    });
    if (!detailMeal) {
      return {
        msg: 'User does not have this meal',
        stateCode: 400,
        data: null,
      };
    }
    const rs = await this.detailMealRepository.remove(detailMeal);
    return { msg: 'Delete user meal successfully', stateCode: 200, data: rs };
  }

  async getUserMeals(userId: number, limit: number) {
    const details = await this.detailMealRepository.find({
      where: { user: { id: userId } },
      relations: ['mealItem', 'mealItem.recipe', 'mealItem.meal'],
      take: limit,
    });
    return {
      msg: 'Get user meals successfully',
      stateCode: 200,
      data: details,
    };
  }

  async getMeals(limit: number) {
    const meals = await this.mealRepository.find();
    if (!meals || !meals.length)
      return { msg: 'No meals found', stateCode: 200, data: [] };
    const rs: { meal: Meal; recipe: Recipes[] }[] = [];
    for (const meal of meals) {
      const recipe = await this.recipeRepository.find({
        where: { mealItems: { meal: { id: meal.id } } },
        take: limit,
      });
      //   const recipe = await this.recipeRepository
      //     .createQueryBuilder('recipe')
      //     .innerJoin('recipe.mealItems', 'mealItems')
      //     .innerJoin('mealItems.meal', 'meal')
      //     .where('meal.id = :id', { id: meal.id })
      //     .take(limit)
      //     .getMany();
      rs.push({ meal, recipe });
    }
    return { msg: 'Get meals successfully', stateCode: 200, data: rs };
  }

  async getMealDetails(mealId: number, recipeId: number) {
    const mealRecipe = await this.mealItemRepository.findOne({
      where: { meal: { id: mealId }, recipe: { id: recipeId } },
      relations: ['meal', 'recipe'],
    });

    if (!mealRecipe) {
      return {
        msg: `No meal with id ${mealId} & recipe id ${recipeId}`,
        stateCode: 400,
        data: null,
      };
    }

    const ingredients = await this.ingredientRepository.find({
      where: { recipeItems: { recipe: { id: recipeId } } },
      relations: ['recipeItems'],
    });

    return {
      msg: 'Get meal details successfully',
      stateCode: 200,
      data: { mealRecipe, ingredients },
    };
  }
}
