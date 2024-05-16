import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateCategoryDto {

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  category_name: string;

  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @IsOptional()
  description?: string;

}
