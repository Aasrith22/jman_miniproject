import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course-dto';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {

    constructor(private courseservice : CourseService){}
    @Post()
    async createcourse(@Body() createcoursedto : CreateCourseDto){
        console.log("Adding Course - Msg from Course Module's Controller");
        const data = await this.courseservice.createcourse(createcoursedto);
        console.log(data);
        return data;
    }

    @Get(':id')
    async getcontent(@Param('id') id : string){
        console.log("Getting Course Content - Msg from Course Module's Controller");
        return await this.courseservice.getcontent(id);
    }

}
