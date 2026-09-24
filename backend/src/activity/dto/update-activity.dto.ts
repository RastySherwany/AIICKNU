import { PartialType } from '@nestjs/mapped-types';
import { CreateActivityDto } from './create-activity.dto.js';

export class UpdateActivityDto extends PartialType(CreateActivityDto) {}
