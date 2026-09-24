import { Module } from '@nestjs/common';
import { DatasetService } from './dataset.service.js';
import { DatasetController } from './dataset.controller.js';

@Module({
  controllers: [DatasetController],
  providers: [DatasetService],
})
export class DatasetModule {}
