import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryController } from './cloudinary.controller';
import { CloudinaryService } from './cloudinary.service';

@Module({
  controllers: [CloudinaryController],
  providers: [
    {
      provide: 'Cloudinary',
      useFactory: (configService: ConfigService) => {
        return cloudinary.config({
          cloud_name: configService.getOrThrow('CLOUDINARY_CLOUD_NAME'),
          api_key: configService.getOrThrow('CLOUDINARY_API_KEY'),
          api_secret: configService.getOrThrow('CLOUDINARY_API_SECRET'),
        });
      },
      inject: [ConfigService],
    },
    CloudinaryService,
  ],
})
export class CloudinaryModule {}
