import { Expose } from "class-transformer";

export class UserDto {
  @Expose()
  public _id: number;

  @Expose()
  public email: string;
}
