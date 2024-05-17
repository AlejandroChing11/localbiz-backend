import { Type } from "class-transformer";
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID, MaxLength, MinLength, ValidateNested } from "class-validator";
import { CreateProductDto } from "src/product/dto/create-product.dto";

export class CreatePurchaseDto {

  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @MaxLength(50)
  supplierName: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductDto)
  products: CreateProductDto[];

}
