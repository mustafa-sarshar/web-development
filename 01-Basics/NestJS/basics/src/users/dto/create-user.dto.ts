import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MinLength,
} from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  public username: string;

  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  public password: string;
}
