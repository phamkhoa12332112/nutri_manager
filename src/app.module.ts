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
@Module({
  imports: [
    DatabaseModule,
    MocksModule,
    UsersModule,
    MealsModule,
    RecipeModule,
    MoodsModule,
    CloudinaryModule,
    ConfigModule.forRoot({
      envFilePath: './.env',
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
