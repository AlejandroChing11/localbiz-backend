import { IsArray, IsDate, IsNotEmpty, IsNumber, IsPositive, IsUUID, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';
import { CreateProductDto } from "src/product/dto/create-product.dto";

export class CreateSaleDto {

  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  tax: number;

  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductDto)
  products: CreateProductDto[];

  @IsNumber()
  @IsPositive()
  total: number;
}
