import { PartialType } from '@nestjs/mapped-types';
import { CreateNewsDto } from './create-news.dto.js';

export class UpdateNewsDto extends PartialType(CreateNewsDto) {}
