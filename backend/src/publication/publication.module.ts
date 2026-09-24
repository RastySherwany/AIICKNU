import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service.js';
import { PublicationController } from './publication.controller.js';

@Module({
  controllers: [PublicationController],
  providers: [PublicationService],
})
export class PublicationModule {}
