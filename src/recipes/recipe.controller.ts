import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/req/createRecipe.dto';
import { DeleteRecipesDto } from './dto/req/deleteRecipes.dto';
import { UpdateRecipeDto } from './dto/req/updateRecipe.dto';

@Controller('recipes')
export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  @Post()
  createRecipe(@Body() recipe: CreateRecipeDto) {
    return this.recipeService.create(recipe);
  }

  @Patch(':id')
  updateRecipe(@Body() recipe: UpdateRecipeDto, @Param('id') id: number) {
    return this.recipeService.update(id, recipe);
  }

  @Delete()
  deleteRecipes(@Body() data: DeleteRecipesDto) {
    return this.recipeService.delete(data);
  }

  @Get('/:id')
  getRecipe(@Param('id') id: number) {
    return this.recipeService.getById(id);
  }

  @Get()
  getAllRecipes() {
    return this.recipeService.getAll();
  }
}
