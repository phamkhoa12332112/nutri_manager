import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GoalTracking, User } from 'src/database/entities';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/req/CreateUser.dto';
import { LoginUserDto } from './dto/req/LoginUserDto.dto';
import { UpdateUserDto } from './dto/req/UpdateUserDto.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(GoalTracking)
    private goalTrackingRepository: Repository<GoalTracking>,
  ) {}

  async getStatistics(from: string, to: string, userId: number) {
    const goalTrackings = await this.goalTrackingRepository
      .createQueryBuilder('goalTracking')
      .where(
        'CAST(goalTracking.intakeDate as Date) >= CAST(:from as Date) AND CAST(goalTracking.intakeDate as Date) <= CAST(:to as Date)',
        { from, to },
      )
      .andWhere('goalTracking.userId = :userId', { userId: userId })
      .getMany();
    return {
      msg: 'Get statistics successfully!',
      statusCode: 200,
      data: goalTrackings,
    };
  }

  async register(newUser: CreateUserDto) {
    const isUserExist = await this.userRepository.findOne({
      where: [{ email: newUser.email }, { userId: newUser.userId }],
    });

    if (isUserExist) {
      throw new BadRequestException('User is already existing!');
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

  async getUser(userId: string) {
    const user = await this.userRepository.findOneBy({ userId: userId });
    if (!user) {
      throw new BadRequestException('User not found!');
    }
    return user;
  }

  async getAll() {
    const users = await this.userRepository.find();
    return { msg: 'Get all users successfully', stateCode: 200, data: users };
  }
}
