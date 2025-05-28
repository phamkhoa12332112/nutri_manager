import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { MoodsService } from './moods.service';

@Controller('/moods')
export class MoodsController {
  constructor(private readonly moodsService: MoodsService) {}

  @Get('/:moodId')
  getRecipesByMoodId(
    @Param('moodId', ParseIntPipe) moodId: number,
    @Query('limit') limit: number = 10,
  ) {
    return this.moodsService.getRecipesByMoodId(moodId, limit);
  }

  @Get()
  getAllMoods() {
    return this.moodsService.getAll();
  }
}
