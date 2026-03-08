export interface Course{
    course_id : string;
    course_name:string;
    technology:string;
    fk_instructor_id:string;
    created_at: string;
}
export interface CourseModule{
    module_id: string;
    module_title : string;
    module_description : string;
    fk_course_id : string;
}
export interface Section{
    section_id:string;
    section_title:string;
    section_content?:string;
    sections_images?:string;
    content_url?:string;
    url_description?:string;
    module_id:string;
    created_at:string;
}
export interface CreateCourseDTO {
  course_name: string;
  technology: string;
  fk_instructor_id:string;
}
export interface CreateModuleDto{
    module_title :string;
    module_description : string;
    course_id : string;
}
// export interface CreateSectionDto{
//     section_title : string,
//     module_id : string;
// }
export interface CreateSectionDto {
  section_title: string;
  module_id: string;
  section_content?: string;
  section_images?: string;
  image_description?: string;
  content_url?: string;
  url_description?: string;
}