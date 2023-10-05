import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Report } from "../../reports/entities/report.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public _id: number;

  @Column()
  public email: string;

  @Column()
  public password: string;

  @Column({ default: false })
  public admin: boolean;

  @OneToMany(() => Report, (report) => report.user)
  public reports: Report[];

  @AfterInsert()
  public logInsert() {
    console.log(`Inserted! User _id:${this._id}`);
  }

  @AfterRemove()
  public logRemove() {
    console.log(`Removed! User _id:${this._id}`);
  }

  @AfterUpdate()
  public logUpdate() {
    console.log(`Updated! User _id:${this._id}`);
  }
}
