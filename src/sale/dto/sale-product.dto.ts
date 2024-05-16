import { IsNumber, IsPositive, IsUUID, Min } from "class-validator";


export class SaleProductDto {

  @IsUUID()
  productId: string;

  @IsNumber()
  @IsPositive()
  @Min(1)
  quantity: number;

}