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
    if (update.ingredientIds && update.ingredientIds.length > 0) {
      const recipeItemCreates = update.ingredientIds.filter((ingredientId) => {
        return (
          recipe.items.findIndex((i) => i.ingredient.id === ingredientId) === -1
        );
      });
      const recipeItemDeletes = recipe.items.filter((item) => {
        return !update.ingredientIds.includes(item.ingredient.id);
      });
      recipe.items = [
        ...recipe.items,
        ...recipeItemCreates.map((ingredientId) => {
          return this.recipeItemsRepository.create({
            quantity: 1,
            ingredient: { id: ingredientId },
            recipe: { id: recipe.id },
          });
        }),
      ];
      recipe.items = recipe.items.filter((item) => {
        return !recipeItemDeletes.includes(item);
      });
    }

    if (update.mealIds && update.mealIds.length > 0) {
      const mealItemCreates = update.mealIds.filter((mealId) => {
        return recipe.mealItems.findIndex((i) => i.meal.id === mealId) === -1;
      });
      const mealItemDeletes = recipe.mealItems.filter((item) => {
        return !update.mealIds.includes(item.meal.id);
      });

      recipe.mealItems = [
        ...recipe.mealItems,
        ...mealItemCreates.map((mealId) => {
          return this.mealItemRepository.create({
            quantity: 1,
            meal: { id: mealId },
            recipe: { id: recipe.id },
          });
        }),
      ];
      recipe.mealItems = recipe.mealItems.filter((item) => {
        return !mealItemDeletes.includes(item);
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
