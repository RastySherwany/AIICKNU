import { Module } from '@nestjs/common';
import { NewsService } from './news.service.js';
import { NewsController } from './news.controller.js';

@Module({
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
