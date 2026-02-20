import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateSectionDto {
  @IsString()
  @IsNotEmpty()
  section_title: string;

  @IsOptional()
  @IsString()
  section_content?: string;

  @IsOptional()
  @IsString()
  section_images?: string;

  @IsOptional()
  @IsString()
  image_description?: string;

  @IsOptional()
  @IsString()
  content_url?: string;

  @IsOptional()
  @IsString()
  url_description?: string;

  @IsString()
  @IsNotEmpty()
  module_id: string; // Which module this section belongs to
}
