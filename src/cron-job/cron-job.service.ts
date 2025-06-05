import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DetailMeals,
  GoalTracking,
  Recipes,
  User,
} from 'src/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class CronJobService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(GoalTracking)
    private goalTrackingRepository: Repository<GoalTracking>,
    @InjectRepository(Recipes) private recipeRepository: Repository<Recipes>,
    @InjectRepository(DetailMeals)
    private detailMealRepository: Repository<DetailMeals>,
  ) {}

  // @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  handleCron() {
    return this.handleUpdate();
  }

  async handleUpdate() {
    const users = await this.userRepository.find();
    console.log('users', users);

    for (const user of users) {
      const goalTracking = await this.handleUpdateGoalTracking(user);
      await this.goalTrackingRepository.save(goalTracking);
    }
  }

  async handleUpdateGoalTracking(user: User) {
    const totalCalories = await this.handleTotalCalories(user);
    const goalTracking = this.goalTrackingRepository.create({
      dailyCaloriesGoal: user.dailyCaloriesGoal,
      totalCalories: totalCalories,
      goalStatus: this.handleGoalStatus(user.dailyCaloriesGoal, totalCalories),
      user: { id: user.id },
    });
    return goalTracking;
  }

  async handleTotalCalories(user: User) {
    const recipes = await this.recipeRepository
      .createQueryBuilder('recipe')
      .innerJoin('recipe.mealItems', 'mealItems')
      .innerJoin('mealItems.detailMeals', 'detailMeals')
      .where('detailMeals.userId = :userId', { userId: user.id })
      .andWhere('CAST(detailMeals.mealTime as Date) = CAST(NOW() as Date)')
      .getMany();
    console.log('recipes', recipes);
    return recipes.reduce((total, recipe) => total + recipe.totalCalories, 0);
  }

  handleGoalStatus(dailyCaloriesGoal, totalCalories) {
    if (dailyCaloriesGoal === totalCalories) {
      return 'normal';
    }
    return dailyCaloriesGoal > totalCalories ? 'under' : 'over';
  }
}
