import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { MocksModule } from './mocks/mocks.module';
import { UsersModule } from './users/users.module';
import { MealsModule } from './meals/meals.module';
import { RecipeModule } from './recipes/recipe.module';
import { MoodsModule } from './moods/moods.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ConfigModule } from '@nestjs/config';
import { IngredientsModule } from './ingredients/ingredients.module';
import { CronJobModule } from './cron-job/cron-job.module';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports: [
    DatabaseModule,
    MocksModule,
    UsersModule,
    MealsModule,
    RecipeModule,
    MoodsModule,
    CloudinaryModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: './.env',
      isGlobal: true,
    }),
    IngredientsModule,
    CronJobModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
