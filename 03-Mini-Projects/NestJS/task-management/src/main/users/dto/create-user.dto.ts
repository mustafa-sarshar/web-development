import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  public password: string;
}
/* 
An example of RegExp for a strong password: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
Source: https://gist.github.com/arielweinberger/18a29bfa17072444d45adaeeb8e92ddc
*/
