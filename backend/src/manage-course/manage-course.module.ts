import { Module } from '@nestjs/common';
import { ManageCourseService } from './manage-course.service';
import { ManageCourseController } from './manage-course.controller';

@Module({
  providers: [ManageCourseService],
  controllers: [ManageCourseController]
})
export class ManageCourseModule {}
