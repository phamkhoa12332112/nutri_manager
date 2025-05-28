import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient, Moods, Recipes } from 'src/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class MoodsService {
  constructor(
    @InjectRepository(Moods) private moodsRepository: Repository<Moods>,
    @InjectRepository(Recipes) private recipeRepository: Repository<Recipes>,
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
  ) {}

  async getAll() {
    const moods = await this.moodsRepository.find();
    return { statusCode: 200, data: moods, msg: 'get moods successfully' };
  }

  async getRecipesByMoodId(moodId: number, limit: number) {
    const recipes = await this.recipeRepository.find({
      where: { moodRecommendItems: { mood: { id: moodId } } },
      take: limit,
    });
    if (!recipes || !recipes.length) {
      return { statusCode: 200, data: [], msg: 'no recipes found' };
    }
    const rs: { recipe: Recipes; ingredients: Ingredient[] }[] = [];
    for (const recipe of recipes) {
      const ingredients = await this.ingredientRepository.find({
        where: { recipeItems: { recipe: { id: recipe.id } } },
        relations: ['recipeItems'],
      });
      rs.push({ recipe, ingredients });
    }
    return { statusCode: 200, data: rs, msg: 'get recipes successfully' };
  }
}
