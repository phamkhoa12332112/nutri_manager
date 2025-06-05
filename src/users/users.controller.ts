import { AdminService } from './admin.service';
import { CreateUserDto } from './dto/req/CreateUser.dto';
import { DeleteUsersDto } from './dto/req/DeleteUsers.dto';
import { LoginUserDto } from './dto/req/LoginUserDto.dto';
import { UpdateUserDto } from './dto/req/UpdateUserDto.dto';
import { UpdateUserForAdminDto } from './dto/req/UpdateUserForAdminDto';
import { UsersService } from './users.service';
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

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private adminService: AdminService,
  ) {}

  @Get('/statistics')
  getStatistics(@Query('from') from: string, @Query('to') to: string) {
    return this.usersService.getStatistics(from, to);
  }

  @Post('/register')
  create(@Body() newUser: CreateUserDto) {
    return this.usersService.register(newUser);
  }

  @Post('/login')
  login(@Body() loginUser: LoginUserDto) {
    return this.usersService.login(loginUser);
  }

  @Patch('/update')
  update(@Body() updateUser: UpdateUserDto) {
    return this.usersService.update(updateUser);
  }

  @Get('/me/:userId')
  getMe(@Param('userId') userId: string) {
    return this.usersService.getUser(userId);
  }

  // ADMIN ONLY

  @Patch('/admin/:userId')
  updateAdmin(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateUser: UpdateUserForAdminDto,
  ) {
    return this.adminService.update(updateUser, userId);
  }

  @Delete('/admin')
  delete(@Body() users: DeleteUsersDto) {
    return this.adminService.delete(users);
  }

  @Get('details/:userId')
  getDetailsById(@Param('userId', ParseIntPipe) userId: number) {
    return this.adminService.getDetailsById(userId);
  }

  @Get('/all')
  getAll() {
    return this.adminService.getAll();
  }
}
