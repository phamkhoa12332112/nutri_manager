import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoalTracking, User } from 'src/database/entities';
import { AdminService } from './admin.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, GoalTracking])],
  controllers: [UsersController],
  providers: [UsersService, AdminService],
})
export class UsersModule {}
