import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/req/CreateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(newUser: CreateUserDto) {
    const isNameExisting = await this.userRepository.findOneBy({
      name: newUser.name,
    });

    if (isNameExisting) {
      throw new BadRequestException('Name is already existing!');
    }

    const user = this.userRepository.create(newUser);
    return this.userRepository.save(user);
  }
}
