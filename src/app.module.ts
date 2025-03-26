import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { MocksModule } from './mocks/mocks.module';
@Module({
  imports: [DatabaseModule, MocksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
