import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, ValidateNested } from 'class-validator';
import { CreateProfileDto, UpdateProfileDto } from './profile.dto';
import { OmitType, PartialType } from '@nestjs/mapped-types';


export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ValidateNested()
  @Type(() => CreateProfileDto)
  @IsNotEmpty()
  profile: CreateProfileDto;
}


export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['profile'])) {
    @ValidateNested()
  @Type(() => UpdateProfileDto)
  @IsOptional()
   profile: UpdateProfileDto;
}
