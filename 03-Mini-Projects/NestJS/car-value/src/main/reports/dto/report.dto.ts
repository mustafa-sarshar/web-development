import { Expose, Transform } from "class-transformer";

export class ReportDto {
  @Expose()
  public _id: number;

  @Expose()
  public make: string;

  @Expose()
  public model: string;

  @Expose()
  public year: number;

  @Expose()
  public mileage: number;

  @Expose()
  public lng: number;

  @Expose()
  public lat: number;

  @Expose()
  public price: number;

  @Expose()
  public approved: boolean;

  @Transform(({ obj }) => obj.user._id)
  @Expose()
  public userId: number;
}
