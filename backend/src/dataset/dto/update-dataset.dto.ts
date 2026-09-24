import { PartialType } from '@nestjs/mapped-types';
import { CreateDatasetDto } from './create-dataset.dto.js';

export class UpdateDatasetDto extends PartialType(CreateDatasetDto) {}
