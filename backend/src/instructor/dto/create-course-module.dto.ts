import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCourseModuleDto {
  @IsString()
  @IsNotEmpty()
  module_title: string;

  @IsString()
  @IsNotEmpty()
  module_description: string;

  @IsString()
  @IsNotEmpty()
  fk_course_id: string; // The course this module belongs to
}
