import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength
} from "class-validator";

export class CreateProductDto {

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  product_name: string;

  @IsNumber()
  @IsPositive()
  @Min(0)
  purchase_price: number;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  @Min(1)
  @Max(100)
  quantity: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  category: string;

}
