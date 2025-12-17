import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateProfileDto {
  @IsNotEmpty()
  @IsString()
  name: string;


  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsOptional()
  @IsUrl()
  @IsString()
  avatar: string;
}

export class UpdateProfileDto extends PartialType(CreateProfileDto) {}
