/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BadRequestException, Injectable } from '@nestjs/common';

import * as users from './sample/users.sample.json';
import * as foods from './sample/foods.sample.json';
import * as meals from './sample/meals.sample.json';
import * as mealItems from './sample/mealItems.sample.json';
import * as dailyIntakes from './sample/dailyIntakes.sample.json';
import * as goalTrackings from './sample/goalTrackings.sample.json';
import { InjectRepository } from '@nestjs/typeorm';
import {
  User,
  DailyIntake,
  Food,
  GoalTracking,
  Meal,
  MealItem,
} from 'src/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class MocksService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Food) private foodRepository: Repository<Food>,
    @InjectRepository(Meal) private mealRepository: Repository<Meal>,
    @InjectRepository(MealItem)
    private mealItemRepository: Repository<MealItem>,
    @InjectRepository(DailyIntake)
    private dailyIntakeRepository: Repository<DailyIntake>,
    @InjectRepository(GoalTracking)
    private goalTrackingRepository: Repository<GoalTracking>,
  ) {}

  async mockUser() {
    const mockUsers: User[] = [];
    for (const user of users) {
      const isExistingUser = await this.userRepository.findOneBy({
        id: user.id,
      });
      if (isExistingUser) {
        continue;
      }
      const mockUser = this.userRepository.create(user);
      mockUsers.push(mockUser);
    }
    return this.userRepository.save(mockUsers);
  }

  async mockFoods() {
    const mockFoods: Food[] = [];
    for (const food of foods) {
      const isExistingFood = await this.foodRepository.findOneBy({
        id: food.id,
      });
      if (isExistingFood) {
        continue;
      }
      const mockFood = this.foodRepository.create(food);
      mockFoods.push(mockFood);
    }
    return this.foodRepository.save(mockFoods);
  }

  async mockMeals() {
    const mockMeals: Meal[] = [];
    for (const meal of meals) {
      const isExistingMeal = await this.mealRepository.findOneBy({
        id: meal.id,
      });
      if (isExistingMeal) {
        continue;
      }
      const mockMeal = this.mealRepository.create({
        user: { id: meal.userId },
        ...meal,
      });
      mockMeals.push(mockMeal);
    }
    return this.mealRepository.save(mockMeals);
  }

  async mockMealItems() {
    const mockMealItems: MealItem[] = [];
    for (const mealItem of mealItems) {
      const isExistingMealItem = await this.mealItemRepository.findOneBy({
        id: mealItem.id,
      });
      if (isExistingMealItem) {
        continue;
      }
      const mockMealItem = this.mealItemRepository.create({
        meal: { id: mealItem.mealId },
        food: { id: mealItem.foodId },
        ...mealItem,
      });
      mockMealItems.push(mockMealItem);
    }
    return this.mealItemRepository.save(mockMealItems);
  }

  async mockDailyIntakes() {
    const mockDailyIntakes: DailyIntake[] = [];
    for (const dailyIntake of dailyIntakes) {
      const isExistingDailyIntake = await this.dailyIntakeRepository.findOneBy({
        id: dailyIntake.id,
      });
      if (isExistingDailyIntake) {
        continue;
      }
      const mockDailyIntake = this.dailyIntakeRepository.create({
        user: { id: dailyIntake.userId },
        ...dailyIntake,
      });
      mockDailyIntakes.push(mockDailyIntake);
    }
    return this.dailyIntakeRepository.save(mockDailyIntakes);
  }

  async mockGoalTrackings() {
    const mockGoalTrackings: GoalTracking[] = [];
    for (const goalTracking of goalTrackings) {
      const isExistingGoalTracking =
        await this.goalTrackingRepository.findOneBy({
          id: goalTracking.id,
        });
      if (isExistingGoalTracking) {
        continue;
      }
      const mockGoalTracking = this.goalTrackingRepository.create({
        user: { id: goalTracking.userId },
        ...goalTracking,
      });
      mockGoalTrackings.push(mockGoalTracking);
    }
    return this.goalTrackingRepository.save(mockGoalTrackings);
  }

  async mockAll() {
    try {
      await this.mockUser();
      await this.mockFoods();
      await this.mockMeals();
      await this.mockMealItems();
      await this.mockDailyIntakes();
      await this.mockGoalTrackings();
      return { msg: 'Mock data has been created' };
    } catch (error) {
      console.log(error);
      return { msg: 'Mock data has not been created' };
    }
  }
}
