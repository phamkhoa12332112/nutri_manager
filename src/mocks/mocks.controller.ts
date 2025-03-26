import { Controller, Get } from '@nestjs/common';
import { MocksService } from './mocks.service';

@Controller('mocks')
export class MocksController {
  constructor(private readonly mocksService: MocksService) {}

  @Get('/')
  mock() {
    // return this.mocksService.mockUser();
    // return this.mocksService.mockFoods();
    // return this.mocksService.mockMeals();
    // return this.mocksService.mockMealItems();
    // return this.mocksService.mockDailyIntakes();
    // return this.mocksService.mockGoalTrackings();
    return this.mocksService.mockAll();
  }
}
