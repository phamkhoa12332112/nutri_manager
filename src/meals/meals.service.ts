import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal } from 'typeorm';
import {
  DetailMeals,
  Ingredient,
  Meal,
  MealItem,
  Recipes,
} from 'src/database/entities';
import { Repository } from 'typeorm';
import { CreateUserMealDto } from './dto/req/createUserMeal.dto';
import { CreateMealDto } from './dto/req/createMeal.dto';
import { UpdateMealDto } from './dto/req/updateMeal.dto';
import { DeleteMealsDto } from './dto/req/deleteMeals.dto';
import { UpdateUserIngredientDto } from './dto/req/updateUserIngredient.dto';
import { CustomIngredient } from 'src/database/entities/customIngredient';
import { plainToInstance } from 'class-transformer';
import { IngredientMapper } from './dto/mapper/ingredient.mapper';
import { DetailsQuery } from './dto/query/details.query';

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
    @InjectRepository(CustomIngredient)
    private customIngredientRepository: Repository<CustomIngredient>,
  ) {}

  async createUserMeal(userId: number, detail: CreateUserMealDto) {
    const mealItem = await this.mealItemRepository.findOne({
      where: {
        meal: { id: detail.mealId },
        recipe: { id: detail.recipeId },
      },
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
        mealTime: Equal(detail.mealTime),
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
      mealTime: detail.mealTime,
      user: { id: userId },
      mealItem: { id: mealItem.id },
    });

    const rs = await this.detailMealRepository.save(newDetailMeal);

    return { msg: 'Create user meal successfully', stateCode: 200, data: rs };
  }

  async createMeal(newMeal: CreateMealDto) {
    const isExist = await this.mealRepository.findOne({
      where: { name: newMeal.name },
    });
    if (isExist) {
      return { msg: 'Meal already exist', stateCode: 400, data: null };
    }
    const meal = this.mealRepository.create(newMeal);
    const rs = await this.mealRepository.save(meal);
    return { msg: 'Create meal successfully', stateCode: 200, data: rs };
  }

  async updateMeal(mealId: number, updateMeal: UpdateMealDto) {
    console.log(updateMeal);
    const meal = await this.mealRepository.findOneBy({ id: mealId });
    if (!meal) {
      return { msg: 'Meal not found', stateCode: 400, data: null };
    }
    const isExist = await this.mealRepository.findOne({
      where: { name: updateMeal.name },
    });
    if (isExist) {
      return { msg: 'Name already exist', stateCode: 400, data: null };
    }

    const finalMeal = { ...meal, ...updateMeal };
    const rs = await this.mealRepository.save(finalMeal);
    return { msg: 'Update meal successfully', stateCode: 200, data: rs };
  }

  async updateUserIngredient(userId: number, detail: UpdateUserIngredientDto) {
    const userIngredient = await this.customIngredientRepository.findOne({
      where: {
        userId: userId,
        ingredient: { id: detail.ingredientId },
        recipeId: detail.recipeId,
      },
    });
    if (!userIngredient) {
      const newIngredient = this.customIngredientRepository.create({
        userId: userId,
        ingredient: { id: detail.ingredientId },
        ...detail,
      });
      const rs = await this.customIngredientRepository.save(newIngredient);
      return {
        msg: 'Update user ingredient successfully',
        stateCode: 200,
        data: rs,
      };
    }

    const finalUserIngredient = { ...userIngredient, ...detail };
    const rs = await this.customIngredientRepository.save(finalUserIngredient);
    return {
      msg: 'Update user ingredient successfully',
      stateCode: 200,
      data: rs,
    };
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

  async deleteMeals({ ids }: DeleteMealsDto) {
    const rs = await this.mealRepository.delete(ids);
    return { msg: 'Delete successfully!', stateCode: 200, data: rs };
  }

  async getUserMeals(userId: number, query: DetailsQuery) {
    const details = await this.detailMealRepository
      .createQueryBuilder('dm')
      .innerJoin('dm.user', 'u')
      .leftJoinAndSelect('dm.mealItem', 'mi')
      .leftJoinAndSelect('mi.recipe', 'r')
      .leftJoinAndSelect('mi.meal', 'm')
      .where('u.id = :userId', { userId: userId })
      .andWhere('CAST(dm.mealTime as Date) = CAST(:date as Date)', {
        date: query.date,
      })
      .getMany();
    // const details = await this.detailMealRepository.find({
    //   where: {
    //     user: { id: userId },
    //     mealTime: Equal(new Date(query.date)),
    //   },
    //   relations: ['mealItem', 'mealItem.recipe', 'mealItem.meal'],
    //   take: query.limit,
    // });
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

  async getMealDetails(mealId: number, recipeId: number, userId: number) {
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

    // const ingredients = await this.ingredientRepository.find({
    //   where: { recipeItems: { recipe: { id: recipeId } } },
    //   relations: ['recipeItems'],
    // });
    // 2

    const queryBuilder = this.ingredientRepository.createQueryBuilder('i');
    if (userId) {
      queryBuilder.leftJoin(
        (qb) =>
          qb
            .select('ci.*')
            .from(CustomIngredient, 'ci')
            .innerJoin('users', 'u', 'ci.userId = u.id')
            .where('u.id = :userId', { userId: userId }),
        'tci',
        'tci.ingredientId = i.id',
      );
    }
    const ingredients = await queryBuilder
      .select(
        `i.id,
        i.name,
        i.category,
        i.imageUrl,
        i.unit,
        COALESCE(${userId ? 'tci.calories' : 'NULL'}, i.calories) as calories,
        COALESCE(${userId ? 'tci.protein' : 'NULL'}, i.protein) as protein,
        COALESCE(${userId ? 'tci.fat' : 'NULL'}, i.fat) as fat,
        COALESCE(${userId ? 'tci.carbs' : 'NULL'}, i.carbs) as carbs,
        COALESCE(${userId ? 'tci.fiber' : 'NULL'}, i.fiber) as fiber,
        ri.id as rid,
        COALESCE(${userId ? 'tci.quantity' : 'NULL'}, ri.quantity) as rQuantity`,
      )
      .innerJoin('i.recipeItems', 'ri')
      .where('ri.recipeId = :id', { id: recipeId })
      .getRawMany();

    const finalIngredient = plainToInstance(IngredientMapper, ingredients, {
      excludeExtraneousValues: true,
    }).reduce((acc, cur) => {
      const x = acc.find((item) => item.id === cur.id);
      if (x) {
        x.recipeItems.push(cur.recipeItem);
        return acc;
      }
      acc.push(
        this.ingredientRepository.create({
          ...cur,
          recipeItems: [cur.recipeItem],
        }),
      );
      return acc;
    }, [] as Ingredient[]);

    return {
      msg: 'Get meal details successfully',
      stateCode: 200,
      data: {
        mealRecipe,
        ingredients: finalIngredient,
      },
    };
  }

  async getIngredients() {
    const ingredients = await this.ingredientRepository.find();
    return {
      msg: 'Get ingredients successfully',
      stateCode: 200,
      data: ingredients,
    };
  }
}
