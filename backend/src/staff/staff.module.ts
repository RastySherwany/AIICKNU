import { Module } from '@nestjs/common';
import { StaffService } from './staff.service.js';
import { StaffController } from './staff.controller.js';

@Module({
  controllers: [StaffController],
  providers: [StaffService],
})
export class StaffModule {}
