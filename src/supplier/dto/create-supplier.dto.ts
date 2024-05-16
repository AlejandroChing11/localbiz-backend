import { IsArray, IsNumber, IsOptional, IsPositive, IsString, IsUUID, MaxLength, MinLength } from "class-validator";

export class CreateSupplierDto {

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  supplier_name: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  debt?: number;

  @IsUUID()
  userId: string;

}
