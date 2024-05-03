import { IsEmail, IsNumber, IsString, Matches, MaxLength, Min, MinLength } from 'class-validator';

export class CreateUserDto {

  @IsString()
  @MinLength(10)
  @MaxLength(20)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(
    /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'The password must have a Uppercase, lowercase letter and a number'
  })
  password: string;

  @IsString()
  @MinLength(10)
  @MaxLength(20)
  address: string;

  @IsNumber()
  @Min(0)
  capital: number;

}
