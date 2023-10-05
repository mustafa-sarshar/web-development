import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from "class-validator";

export class CreateReportDto {
  @IsString()
  @IsNotEmpty()
  public make: string;

  @IsString()
  @IsNotEmpty()
  public model: string;

  @IsNumber()
  @Min(1930)
  @Max(2050)
  @IsNotEmpty()
  public year: number;

  @IsNumber()
  @Min(0)
  @Max(1_000_000)
  @IsNotEmpty()
  public mileage: number;

  @IsNumber()
  @IsLongitude()
  @IsNotEmpty()
  public lng: number;

  @IsNumber()
  @IsLatitude()
  @IsNotEmpty()
  public lat: number;

  @IsNumber()
  @Min(0)
  @Max(1_000_000)
  @IsNotEmpty()
  public price: number;
}
