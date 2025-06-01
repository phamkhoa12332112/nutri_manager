/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Controller,
  ParseFilePipe,
  Post,
  UnsupportedMediaTypeException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

const imageFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: (error, acceptFile: boolean) => void,
) => {
  const isValidType = Boolean(RegExp(/(jpeg|jpg|png)$/).exec(file.mimetype));
  if (!isValidType) {
    return callback(
      new UnsupportedMediaTypeException(
        'image only allowed type jpeg, jpg, png',
      ),
      false,
    );
  }
  return callback(null, true);
};

const imageOptions: MulterOptions = {
  fileFilter: imageFilter,
  limits: {
    fileSize: 1024 * 1024 * 50, // 50MB
  },
};

@Controller('images')
export class CloudinaryController {
  constructor(private cloudinaryService: CloudinaryService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', imageOptions))
  upload(
    @UploadedFile(new ParseFilePipe({ fileIsRequired: true }))
    file: Express.Multer.File,
  ) {
    return this.cloudinaryService.uploadImageFromFile(file);
  }
}
