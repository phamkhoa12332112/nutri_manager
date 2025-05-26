import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipes } from 'src/database/entities';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';

@Module({
  imports: [TypeOrmModule.forFeature([Recipes])],
  controllers: [RecipeController],
  providers: [RecipeService],
})
export class RecipeModule {}
