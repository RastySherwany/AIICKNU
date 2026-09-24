import { PartialType } from '@nestjs/mapped-types';
import { CreatePublicationDto } from './create-publication.dto.js';

export class UpdatePublicationDto extends PartialType(CreatePublicationDto) {}
