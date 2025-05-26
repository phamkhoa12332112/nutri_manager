import { Controller, Get, Param } from '@nestjs/common';
import { RecipeService } from './recipe.service';

@Controller('recipes')
export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  @Get('/:id')
  getRecipe(@Param('id') id: number) {
    return this.recipeService.getById(id);
  }
}
