import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesController } from './course_enrollment/courses.controller';
import { CoursesService } from './course_enrollment/courses.service';

@Module({
  imports: [],
  controllers: [AppController, CoursesController],
  providers: [AppService, CoursesService],
})
export class AppModule {}
