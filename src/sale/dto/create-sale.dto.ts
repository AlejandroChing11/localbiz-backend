import { IsArray, IsUUID, ValidateNested } from "class-validator";
import { SaleProductDto } from "./sale-product.dto";
import { Type } from 'class-transformer';

export class CreateSaleDto {

  @IsUUID()
  userId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SaleProductDto) //TODO: Check if this is necessary
  products: SaleProductDto[];

}
