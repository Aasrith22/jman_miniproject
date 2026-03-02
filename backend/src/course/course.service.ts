import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course-dto';

@Injectable()
export class CourseService {
    constructor(private prismaservice : PrismaService){}

    createcourse(dto : CreateCourseDto){
        return this.prismaservice.course.create(
            {
                data : dto
            }
        )
    }

    getcontent(id : string){
        return this.prismaservice.course.findUnique(
            {
                where : {course_id : id},
                include : {
                    modules : {
                        include : {
                            sections : true,
                        }
                    }
                }
            }
        )
    }
}
