import { Transform } from "class-transformer";
import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from "class-validator";

export class GetEstimateDto {
  @IsString()
  @IsNotEmpty()
  public make: string;

  @IsString()
  @IsNotEmpty()
  public model: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1930)
  @Max(2050)
  @IsNotEmpty()
  public year: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
  @Max(1_000_000)
  @IsNotEmpty()
  public mileage: number;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @IsLongitude()
  @IsNotEmpty()
  public lng: number;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @IsLatitude()
  @IsNotEmpty()
  public lat: number;
}
