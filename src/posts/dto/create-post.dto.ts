import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({description: 'Title of the post'})
  title: string;

  @IsOptional()
  @IsString()
  @ApiProperty({description: 'Content of the post'})
  content?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({description: 'URL of the cover image'})
  coverImage?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({description: 'Summary of the post'})
  summary?: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  @ApiProperty({description: 'Array of category IDs associated with the post'})
  categoryIds?: number[];
}
