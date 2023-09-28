import { IsEmail, IsNotEmpty } from "class-validator";

export class FindUserDto {
  @IsNotEmpty()
  @IsEmail()
  public email: string;
}
