import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma.module';
import { StaffModule } from './staff/staff.module';
import { NewsModule } from './news/news.module';
import { ProjectModule } from './project/project.module';
import { PublicationModule } from './publication/publication.module';
import { ActivityModule } from './activity/activity.module';
import { DatasetModule } from './dataset/dataset.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    PrismaModule,
    StaffModule,
    NewsModule,
    ProjectModule,
    PublicationModule,
    ActivityModule,
    DatasetModule,
    UploadModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
