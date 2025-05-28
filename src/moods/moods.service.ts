import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Moods, Recipes } from 'src/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class MoodsService {
  constructor(
    @InjectRepository(Moods) private moodsRepository: Repository<Moods>,
    @InjectRepository(Recipes) private recipeRepository: Repository<Recipes>,
  ) {}

  async getAll() {
    const moods = await this.moodsRepository.find();
    return { statusCode: 200, data: moods, msg: 'get moods successfully' };
  }

  async getRecipesByMoodId(moodId: number, limit: number) {
    const recipes = await this.recipeRepository.find({
      where: { moodRecommendItems: { mood: { id: moodId } } },
      take: limit,
      relations: ['items', 'items.ingredient'],
    });
    if (!recipes || !recipes.length) {
      return { statusCode: 200, data: [], msg: 'no recipes found' };
    }
    return { statusCode: 200, data: recipes, msg: 'get recipes successfully' };
  }
}
