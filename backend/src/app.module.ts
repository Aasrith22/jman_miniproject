import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ManageCourseModule } from './manage-course/manage-course.module';
import { ManageCouseService } from './manage-couse/manage-couse.service';

@Module({
  imports: [ManageCourseModule],
  controllers: [AppController],
  providers: [AppService, ManageCouseService],
})
export class AppModule {}
