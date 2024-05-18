import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID, MaxLength, MinLength, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';
import { CreateProductDto } from "src/product/dto/create-product.dto";

export class CreateSaleDto {

  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  clientName: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  tax: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductDto)
  products: CreateProductDto[];

}
