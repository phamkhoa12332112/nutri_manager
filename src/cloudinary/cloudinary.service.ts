/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from 'cloudinary';
import * as streamifier from 'streamifier';

export const isUploadSuccess = (
  image: UploadApiResponse | UploadApiErrorResponse,
): image is UploadApiResponse => {
  return 'public_id' in image;
};

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {}

  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    if (!file || !file.buffer) throw new Error('File is empty');
    if (!file.mimetype.startsWith('image/'))
      throw new Error('File is not an image');

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: this.configService.getOrThrow('CLOUDINARY_FOLDER'),
        },
        (error, result) => {
          if (error) return reject(error);
          if (!result) return reject(new Error('Something went wrong'));
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  async uploadImageFromFile(file: Express.Multer.File) {
    const imageObj = await this.uploadImage(file);
    if (!isUploadSuccess(imageObj))
      throw new BadRequestException('Upload failed! Please try again.');
    const data = {
      url: imageObj.url,
      secure: imageObj.secure_url,
      publicId: imageObj.public_id,
    };
    return {
      statusCode: 200,
      msg: 'Image uploaded successfully',
      data,
    };
  }
}
