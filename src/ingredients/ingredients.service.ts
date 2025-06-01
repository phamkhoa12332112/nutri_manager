import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from 'src/database/entities';
import { Repository } from 'typeorm';
import { CreateIngredientDto } from './dto/req/createIngredient.dto';
import { UpdateIngredientDto } from './dto/req/updateIngredient.dto';
import { DeleteIngredientsDto } from './dto/req/deleteIngredients.dto';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
  ) {}

  async createNew(newIngredient: CreateIngredientDto) {
    const isNameExisting = await this.ingredientRepository.findOneBy({
      name: newIngredient.name,
    });
    if (isNameExisting) {
      throw new BadRequestException('Ingredient name already exist');
    }
    const newIngredientEntity = this.ingredientRepository.create(newIngredient);
    const rs = await this.ingredientRepository.save(newIngredientEntity);
    return {
      statusCode: 200,
      data: rs,
      msg: 'create new ingredient successfully',
    };
  }

  async update(id: number, update: UpdateIngredientDto) {
    if (update.name) {
      const isNameExisting = await this.ingredientRepository.findOneBy({
        name: update.name,
      });
      if (isNameExisting) {
        throw new BadRequestException('Ingredient name already exist');
      }
    }
    const ingredient = await this.ingredientRepository.findOneBy({ id });
    if (!ingredient) {
      throw new BadRequestException(`Ingredient with id ${id} not found!`);
    }
    const finalIngredient = { ...ingredient, ...update };
    const rs = await this.ingredientRepository.save(finalIngredient);
    return {
      statusCode: 200,
      data: rs,
      msg: 'update ingredient successfully',
    };
  }

  async delete({ ids }: DeleteIngredientsDto) {
    const rs = await this.ingredientRepository.delete(ids);
    return {
      statusCode: 200,
      data: rs,
      msg: 'delete ingredients successfully',
    };
  }

  async getById(id: number) {
    const ingredient = await this.ingredientRepository.findOneBy({ id });
    if (!ingredient) {
      throw new BadRequestException(`Ingredient with id ${id} not found!`);
    }
    return {
      statusCode: 200,
      data: ingredient,
      msg: 'get ingredient successfully',
    };
  }

  async getAll(limit: number) {
    const ingredients = await this.ingredientRepository.find({
      take: limit,
    });
    return {
      statusCode: 200,
      data: ingredients,
      msg: 'get ingredients successfully',
    };
  }
}
