import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Ingredient,
  MoodRecommendItems,
  Moods,
  Recipes,
} from 'src/database/entities';
import { Repository } from 'typeorm';
import { CreateMoodDto } from './req/CreateMood.dto';
import { UpdateMoodDto } from './req/UpdateMood.dto';
import { DeleteMoodsDto } from './req/DeleteMoods.dto';
import {
  MealAndMoodIdDto,
  UpdateRecipeToMoodDto,
} from './req/UpdateRecipeToMood.dto';

@Injectable()
export class MoodsService {
  constructor(
    @InjectRepository(Moods) private moodsRepository: Repository<Moods>,
    @InjectRepository(Recipes) private recipeRepository: Repository<Recipes>,
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
    @InjectRepository(MoodRecommendItems)
    private moodRecommendItemsRepository: Repository<MoodRecommendItems>,
  ) {}

  async getMoodByRecipeId(recipeId: number) {
    const RecipeMoods = await this.moodRecommendItemsRepository.find({
      where: { recipe: { id: recipeId } },
      relations: ['mood', 'meal'],
    });
    return { statusCode: 200, data: RecipeMoods, msg: 'get mood successfully' };
  }

  async getAll() {
    const moods = await this.moodsRepository.find();
    return { statusCode: 200, data: moods, msg: 'get moods successfully' };
  }

  async getDetailsById(moodId: number) {
    const mood = await this.moodsRepository.findOneBy({ id: moodId });
    return { statusCode: 200, data: mood, msg: 'get mood successfully' };
  }

  async getRecipesByMoodId(moodId: number, limit: number) {
    const recipes = await this.recipeRepository.find({
      where: { moodRecommendItems: { mood: { id: moodId } } },
      take: limit,
      relations: ['moodRecommendItems', 'moodRecommendItems.meal'],
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

  async create(newMood: CreateMoodDto) {
    const isExist = await this.moodsRepository.findOne({
      where: { moodName: newMood.moodName },
    });
    if (isExist) {
      return { msg: 'Mood already exist', stateCode: 400, data: null };
    }
    const mood = this.moodsRepository.create(newMood);
    const rs = await this.moodsRepository.save(mood);
    return { msg: 'Create mood successfully', stateCode: 200, data: rs };
  }

  async updateRecipeToMood(data: UpdateRecipeToMoodDto, recipeId: number) {
    const isRecipeExist = await this.recipeRepository.findOneBy({
      id: recipeId,
    });
    if (!isRecipeExist) {
      return { msg: 'Recipe not found', statusCode: 400, data: null };
    }
    const recipeMoods = await this.moodRecommendItemsRepository.find({
      where: { recipe: { id: recipeId } },
      relations: ['mood', 'meal'],
    });
    const recipeMoodCreates = data.data.reduce((acc, item) => {
      const duplicate = acc.find(
        (i) => i.moodId === item.moodId && i.mealId === item.mealId,
      );
      if (duplicate) {
        return acc;
      }
      const existRecipe = recipeMoods.find((i) => {
        if (i.mood.id === item.moodId && i.meal.id === item.mealId) {
          return true;
        }
        return false;
      });
      if (!existRecipe) {
        acc.push(item);
      }
      return acc;
    }, [] as MealAndMoodIdDto[]);
    const recipeMoodDeletes = recipeMoods.filter((i) => {
      return (
        data.data.findIndex(
          (u) => u.moodId === i.mood.id && u.mealId === i.meal.id,
        ) === -1
      );
    });

    await this.moodRecommendItemsRepository.remove(recipeMoodDeletes);
    const rs = await this.moodRecommendItemsRepository.save(
      recipeMoodCreates.map((i) => {
        return this.moodRecommendItemsRepository.create({
          recipe: { id: recipeId },
          meal: { id: i.mealId },
          mood: { id: i.moodId },
        });
      }),
    );
    return { msg: 'Update successfully!', stateCode: 200, data: rs };
  }

  async update(updateMood: UpdateMoodDto, id: number) {
    const mood = await this.moodsRepository.findOneBy({ id: id });
    if (!mood) {
      return { msg: 'Mood not found!', stateCode: 400, data: null };
    }
    const isExistName = await this.moodsRepository.findOneBy({
      moodName: updateMood.moodName,
    });
    if (isExistName) {
      return { msg: 'Mood name already exist', stateCode: 400, data: null };
    }
    const finalMood = { ...mood, ...updateMood };
    const rs = await this.moodsRepository.save(finalMood);
    return { msg: 'Update successfully!', stateCode: 200, data: rs };
  }

  async delete({ ids }: DeleteMoodsDto) {
    const rs = await this.moodsRepository.delete(ids);
    return { msg: 'Delete successfully!', stateCode: 200, data: rs };
  }
}
