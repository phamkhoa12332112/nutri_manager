import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/req/CreateUser.dto';
import { LoginUserDto } from './dto/req/LoginUserDto.dto';
import { UpdateUserDto } from './dto/req/UpdateUserDto.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(newUser: CreateUserDto) {
    const isEmailExist = await this.userRepository.findOneBy({
      email: newUser.email,
    });

    if (isEmailExist) {
      throw new BadRequestException('Name is already existing!');
    }

    const user = this.userRepository.create(newUser);
    return this.userRepository.save(user);
  }

  async login(loginUser: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: { email: loginUser.email, userId: loginUser.userId },
    });

    if (!user) {
      throw new BadRequestException('Login failed! Please try again!');
    }

    return { msg: 'Login successfully!', stateCode: 200 };
  }

  async update(updateUser: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({
      userId: updateUser.userId,
    });
    if (!user) {
      throw new BadRequestException('User not found!');
    }
    const finalUser = { ...user, ...updateUser };
    const rs = await this.userRepository.save(finalUser);
    return {
      msg: 'Update successfully!',
      stateCode: 200,
      data: rs,
    };
  }
}
