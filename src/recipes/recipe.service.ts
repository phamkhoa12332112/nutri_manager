import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Ingredient,
  Meal,
  MealItem,
  RecipeItems,
  Recipes,
} from 'src/database/entities';
import { In, Repository } from 'typeorm';
import { CreateRecipeDto } from './dto/req/createRecipe.dto';
import { DeleteRecipesDto } from './dto/req/deleteRecipes.dto';
import { UpdateRecipeDto } from './dto/req/updateRecipe.dto';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipes) private recipeRepository: Repository<Recipes>,
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
    @InjectRepository(Meal) private mealRepository: Repository<Meal>,
    @InjectRepository(RecipeItems)
    private recipeItemsRepository: Repository<RecipeItems>,
    @InjectRepository(MealItem)
    private mealItemRepository: Repository<MealItem>,
  ) {}

  async create(data: CreateRecipeDto) {
    const ingredientIds = data.ingredients.map((ingredient) => {
      return ingredient.id;
    });

    const mealIds = data.meals.map((meal) => {
      return meal.id;
    });

    const ingredients = await this.ingredientRepository.find({
      where: { id: In(ingredientIds) },
    });
    const meals = await this.mealRepository.find({
      where: { id: In(mealIds) },
    });

    const recipeEntity = this.recipeRepository.create(data);

    const recipeItems = ingredients.map((ingredient) => {
      const quantity = data.ingredients.find(
        (i) => i.id === ingredient.id,
      )?.quantity;
      return this.recipeItemsRepository.create({
        ingredient: ingredient,
        quantity,
      });
    });

    const mealItems = meals.map((meal) => {
      const quantity = data.meals.find((i) => i.id === meal.id)?.quantity;
      return this.mealItemRepository.create({
        meal: meal,
        quantity,
      });
    });

    recipeEntity.items = recipeItems;
    recipeEntity.mealItems = mealItems;
    const recipe = await this.recipeRepository.save(recipeEntity);

    return {
      msg: 'Create recipe successfully',
      stateCode: 200,
      data: { recipe },
    };
  }

  async update(id: number, update: UpdateRecipeDto) {
    const recipe = await this.recipeRepository.findOne({
      where: { id: id },
      relations: ['items', 'items.ingredient', 'mealItems', 'mealItems.meal'],
    });
    if (!recipe) {
      throw new BadRequestException(`Recipe with id ${id} not found!`);
    }
    if (update.ingredients) {
      const ingredientNeedUpdates = update.ingredients.filter((ingredient) => {
        return ingredient.quantity;
      });
      const ingredientNeedUpdateIds = ingredientNeedUpdates.map((i) => i.id);
      const ingredientNeedDeletes = update.ingredients.filter((ingredient) => {
        return !ingredient.quantity;
      });
      const ingredientNeedDeleteIds = ingredientNeedDeletes.map((i) => i.id);
      recipe.items = recipe.items.map((item) => {
        const indexOfItem = ingredientNeedUpdateIds.findIndex(
          (i) => i === item.ingredient.id,
        );
        if (indexOfItem !== -1) {
          item.quantity = ingredientNeedUpdates[indexOfItem].quantity;
        }
        return item;
      });

      recipe.items = recipe.items.filter((item) => {
        return !ingredientNeedDeleteIds.includes(item.ingredient.id);
      });
    }

    if (update.meals) {
      const mealNeedUpdates = update.meals.filter((meal) => {
        return meal.quantity;
      });
      const mealNeedUpdateIds = mealNeedUpdates.map((i) => i.id);
      const mealNeedDeletes = update.meals.filter((meal) => {
        return !meal.quantity;
      });
      const mealNeedDeleteIds = mealNeedDeletes.map((i) => i.id);

      recipe.mealItems = recipe.mealItems.map((item) => {
        const indexOfItem = mealNeedUpdateIds.findIndex(
          (i) => i === item.meal.id,
        );
        if (indexOfItem !== -1) {
          item.quantity = mealNeedUpdates[indexOfItem].quantity;
        }
        return item;
      });

      recipe.mealItems = recipe.mealItems.filter((item) => {
        return !mealNeedDeleteIds.includes(item.meal.id);
      });
    }
    const finalRecipe = { ...recipe, ...update };
    const rs = await this.recipeRepository.save(finalRecipe);
    return {
      statusCode: 200,
      data: rs,
      msg: 'update recipe successfully',
    };
  }

  async delete({ ids }: DeleteRecipesDto) {
    const rs = await this.recipeRepository.delete(ids);
    return { msg: 'Delete successfully!', stateCode: 200, data: rs };
  }

  async getById(id: number) {
    const recipe = await this.recipeRepository.findOne({
      where: { id },
      relations: ['items', 'items.ingredient', 'mealItems', 'mealItems.meal'],
    });
    return { msg: 'Get recipe successfully', stateCode: 200, data: recipe };
  }

  async getAll() {
    const recipes = await this.recipeRepository.find();
    return {
      msg: 'Get all recipes successfully',
      stateCode: 200,
      data: recipes,
    };
  }
}
