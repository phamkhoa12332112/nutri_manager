import { OmitType } from '@nestjs/swagger';
import { UpdateUserDto } from './UpdateUserDto.dto';

export class UpdateUserForAdminDto extends OmitType(UpdateUserDto, [
  'userId',
] as const) {}
