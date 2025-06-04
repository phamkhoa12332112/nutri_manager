import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MoodsService } from './moods.service';
import { CreateMoodDto } from './req/CreateMood.dto';
import { UpdateMoodDto } from './req/UpdateMood.dto';
import { DeleteMoodsDto } from './req/DeleteMoods.dto';
import { UpdateRecipeToMoodDto } from './req/UpdateRecipeToMood.dto';

@Controller('/moods')
export class MoodsController {
  constructor(private readonly moodsService: MoodsService) {}

  @Get('/details/:moodId')
  getDetailsById(@Param('moodId', ParseIntPipe) moodId: number) {
    return this.moodsService.getDetailsById(moodId);
  }

  @Get('/:moodId')
  getRecipesByMoodId(
    @Param('moodId', ParseIntPipe) moodId: number,
    @Query('limit') limit: number = 10,
  ) {
    return this.moodsService.getRecipesByMoodId(moodId, limit);
  }

  @Post()
  createNewMood(@Body() newMood: CreateMoodDto) {
    return this.moodsService.create(newMood);
  }

  @Patch('/recipe/:recipeId')
  updateRecipeToMood(
    @Param('recipeId', ParseIntPipe) recipeId: number,
    @Body() data: UpdateRecipeToMoodDto,
  ) {
    return this.moodsService.updateRecipeToMood(data, recipeId);
  }

  @Patch('/:moodId')
  updateMood(
    @Param('moodId', ParseIntPipe) moodId: number,
    @Body() mood: UpdateMoodDto,
  ) {
    return this.moodsService.update(mood, moodId);
  }

  @Delete()
  deleteMood(@Body() moods: DeleteMoodsDto) {
    return this.moodsService.delete(moods);
  }

  @Get()
  getAllMoods() {
    return this.moodsService.getAll();
  }
}
