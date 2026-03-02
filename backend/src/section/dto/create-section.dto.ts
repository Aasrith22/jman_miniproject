import { IsString } from "class-validator"

export class CreateSectionDto{
    @IsString()
    section_title : string

    @IsString()
    section_content ?: string

    @IsString()
    section_images ?: string

    @IsString()
    image_description ?: string

    @IsString()
    content_url ?:string

    @IsString()
    url_description ?: string

    @IsString()
    module_id : string
}