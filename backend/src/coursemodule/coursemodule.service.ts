import { Injectable } from '@nestjs/common';
import { CreateModuleDto } from './dto/create-module.dto';
import { PrismaService } from '../prisma/prisma.service';
import { connect } from 'http2';

@Injectable()
export class CoursemoduleService {
    constructor(private prismaservice : PrismaService){}
    createmodule(courseid:string, dto : CreateModuleDto){
        return this.prismaservice.courseModule.create(
            {
                data:{
                    module_title : dto.module_title,
                    module_description : dto.module_description,

                    course : {
                        connect : {
                            course_id : courseid,
                        }
                    }
                }
            }
        )
    }

    getcoursemodules(id : string){
        return this.prismaservice.courseModule.findMany(
            {
                where : {fk_course_id : id},
                orderBy : {module_title : 'asc'}
            }
        )
    }
}
