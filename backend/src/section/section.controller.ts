import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { SectionService } from './section.service';
import { CreateSectionDto } from './dto/create-section.dto';

@Controller('section')
export class SectionController {
    constructor(private sectionservice : SectionService){}

    @Post(':id')
    createsection(@Param('id') id : string,@Body() sectiondto : CreateSectionDto){
        console.log("Creating Section - Msg from Section Module's Controller");
        return this.sectionservice.createsection(id,sectiondto);
    }

    @Get(':id')
    getsections(@Param('id') id : string){
        console.log("Getting Sections - Msg from Section Module's Controller");
        return this.sectionservice.getsections(id);
    }

}
