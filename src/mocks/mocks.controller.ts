import { Controller, Get } from '@nestjs/common';
import { MocksService } from './mocks.service';

/*
SET FOREIGN_KEY_CHECKS = 0; 
SET @tables = NULL;
SELECT GROUP_CONCAT('`', table_schema, '`.`', table_name, '`') INTO @tables
  FROM information_schema.tables 
  WHERE table_schema = 'database_name'; -- specify DB name here. (In this case is 'health')

SET @tables = CONCAT('DROP TABLE ', @tables);
PREPARE stmt FROM @tables;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
SET FOREIGN_KEY_CHECKS = 1;
*/

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
