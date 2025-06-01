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
import { IngredientsService } from './ingredients.service';
import { CreateIngredientDto } from './dto/req/createIngredient.dto';
import { UpdateIngredientDto } from './dto/req/updateIngredient.dto';
import { DeleteIngredientsDto } from './dto/req/deleteIngredients.dto';

@Controller('ingredients')
export class IngredientsController {
  constructor(private ingredientsService: IngredientsService) {}

  @Post()
  CreateIngredient(@Body() newIngredient: CreateIngredientDto) {
    return this.ingredientsService.createNew(newIngredient);
  }

  @Patch(':id')
  updateIngredient(
    @Param('id', ParseIntPipe) id: number,
    @Body() update: UpdateIngredientDto,
  ) {
    return this.ingredientsService.update(id, update);
  }

  @Delete()
  deleteIngredients(@Body() data: DeleteIngredientsDto) {
    return this.ingredientsService.delete(data);
  }

  @Get(':id')
  getIngredientById(@Param('id', ParseIntPipe) id: number) {
    return this.ingredientsService.getById(id);
  }

  @Get()
  getAllIngredients(@Query('limit') limit: number = 10) {
    return this.ingredientsService.getAll(limit);
  }
}
