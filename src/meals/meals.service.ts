import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Meal, Recipes } from 'src/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class MealsService {
  constructor(
    @InjectRepository(Meal) private mealRepository: Repository<Meal>,
    @InjectRepository(Recipes) private recipeRepository: Repository<Recipes>,
  ) {}

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
}
