import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { User } from "../../users/entities/user.entity";

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  public _id: number;

  @Column()
  public price: number;

  @Column()
  public make: string;

  @Column()
  public model: string;

  @Column()
  public year: number;

  @Column()
  public lng: number;

  @Column()
  public lat: number;

  @Column()
  public mileage: number;

  @Column({ default: false })
  public approved: boolean;

  @ManyToOne(() => User, (user) => user.reports)
  public user: User;
}
