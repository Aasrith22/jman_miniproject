import { Body, Controller,Post } from '@nestjs/common';
import { InstructorService } from './instructor.service';

@Controller('instructor')
export class InstructorController {
    constructor(private instructorservice : InstructorService){};

    @Post()
    createcourse(@Body() userid , ){

    }
}
