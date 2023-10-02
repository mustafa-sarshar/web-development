import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  @IsString()
  public email: string;

  @IsOptional()
  @IsStrongPassword()
  @IsString()
  public password: string;
}
