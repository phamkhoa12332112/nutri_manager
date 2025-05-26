import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipes } from 'src/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipes) private recipeRepository: Repository<Recipes>,
  ) {}

  async getById(id: number) {
    const recipe = await this.recipeRepository.findOne({ where: { id } });
    return { msg: 'Get recipe successfully', stateCode: 200, data: recipe };
  }
}
