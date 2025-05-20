import { CreateUserDto } from './dto/req/CreateUser.dto';
import { LoginUserDto } from './dto/req/LoginUserDto.dto';
import { UsersService } from './users.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() newUser: CreateUserDto) {
    return this.usersService.createUser(newUser);
  }

  @Post()
  login(@Body() loginUser: LoginUserDto) {
    return this.usersService.login(loginUser);
  }
}
