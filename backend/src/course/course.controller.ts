import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course-dto';
import { CourseService } from './course.service';
import { CreateAssessmentDTO } from './dto/create-assessment-dto';
import { CreateQuestionDTO } from './dto/create-question.dto';

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

    @Get('fetchassessment/:course_id')
    async fetchassessment(@Param('course_id') id : string){
        console.log("Fetching Assessment - Msg from Course Controller");
        return await this.courseservice.fetchassessment(id);
    }

    @Post('createassessment')
    async createassessment(@Body() dto : CreateAssessmentDTO){
        console.log("Creating Assessment - Msg from Course Module's Controller");
        return await this.courseservice.createassessment(dto);
    }
    @Post('/questions')
    async createquestion(@Body() dto : CreateQuestionDTO){
        console.log("Adding Qustion");
        return await this.courseservice.createquestion(dto);
    }

    @Get('/questions/assessment/:assessmentId')
    async fetchquestions(@Param('assessmentId') id : string){
        console.log("fetching questions");
        return await this.courseservice.getquestions(id);
    }

    @Delete('/questions/:id')
    async deletequestion(@Param('id') id : string){
        console.log(`deleting the question with id ${id}`);
        return await this.courseservice.deletequestion(id);
    }
}
