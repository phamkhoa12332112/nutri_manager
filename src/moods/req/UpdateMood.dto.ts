import { PartialType } from '@nestjs/swagger';
import { CreateMoodDto } from './CreateMood.dto';

export class UpdateMoodDto extends PartialType(CreateMoodDto) {}
