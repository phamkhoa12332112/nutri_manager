import { Module } from '@nestjs/common';
import { MoodsController } from './moods.controller';
import { MoodsService } from './moods.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Ingredient,
  MoodRecommendItems,
  Moods,
  RecipeItems,
  Recipes,
} from 'src/database/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Moods,
      MoodRecommendItems,
      Recipes,
      RecipeItems,
      Ingredient,
    ]),
  ],
  controllers: [MoodsController],
  providers: [MoodsService],
  exports: [],
})
export class MoodsModule {}
