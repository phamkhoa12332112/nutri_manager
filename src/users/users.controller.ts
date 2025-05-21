import { CreateUserDto } from './dto/req/CreateUser.dto';
import { LoginUserDto } from './dto/req/LoginUserDto.dto';
import { UpdateUserDto } from './dto/req/UpdateUserDto.dto';
import { UsersService } from './users.service';
import { Body, Controller, Patch, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() newUser: CreateUserDto) {
    return this.usersService.createUser(newUser);
  }

  @Post('/login')
  login(@Body() loginUser: LoginUserDto) {
    return this.usersService.login(loginUser);
  }

  @Patch('/update')
  update(@Body() updateUser: UpdateUserDto) {
    return this.usersService.update(updateUser);
  }
}
