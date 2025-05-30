import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities';
import { Repository } from 'typeorm';
import { UpdateUserForAdminDto } from './dto/req/UpdateUserForAdminDto';
import { DeleteUsersDto } from './dto/req/DeleteUsers.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async update(updateUser: UpdateUserForAdminDto, id: number) {
    const user = await this.userRepository.findOneBy({ id: id });
    if (!user) {
      throw new BadRequestException('User not found!');
    }
    const finalUser = { ...user, ...updateUser };
    const rs = await this.userRepository.save(finalUser);
    return { msg: 'Update successfully!', stateCode: 200, data: rs };
  }

  async delete({ ids }: DeleteUsersDto) {
    const rs = await this.userRepository.delete(ids);
    return { msg: 'Delete successfully!', stateCode: 200, data: rs };
  }

  async getAll() {
    const users = await this.userRepository.find();
    return { msg: 'Get all users successfully', stateCode: 200, data: users };
  }
}
