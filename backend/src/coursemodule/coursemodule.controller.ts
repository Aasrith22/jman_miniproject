import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CoursemoduleService } from './coursemodule.service';
import { CreateModuleDto } from './dto/create-module.dto';

@Controller('coursemodule')
export class CoursemoduleController {
    constructor(private coursemoduleservice : CoursemoduleService){}

    @Post(':id')
    createcoursemodule(@Param('id') courseid : string , @Body() createcoursemoduledto : CreateModuleDto){
        console.log("Creating Course Module - Msg from CourseModule module's controller");
        return this.coursemoduleservice.createmodule(courseid,createcoursemoduledto);
    }

    @Get(':id')
    getcoursemodules(@Param('id') id : string){
        console.log(`Getting Modules of course : ${id} - Msg from CourseModule module's controller`);
        return this.coursemoduleservice.getcoursemodules(id);
    }
}
