import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public _id: number;

  @Column()
  public email: string;

  @Column()
  public password: string;

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
