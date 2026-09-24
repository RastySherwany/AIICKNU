import { PartialType } from '@nestjs/mapped-types';
import { CreateStaffDto } from './create-staff.dto.js';

export class UpdateStaffDto extends PartialType(CreateStaffDto) {}
