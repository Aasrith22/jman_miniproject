import { Controller, Get } from '@nestjs/common';
import { StudentCourseService } from './student-course.service';

@Controller('student/courses')
export class StudentCourseController {
  constructor(private readonly studentCourseService: StudentCourseService) {}

  @Get()
  getAllCourses() {
    return this.studentCourseService.getAllCourses();
  }
}