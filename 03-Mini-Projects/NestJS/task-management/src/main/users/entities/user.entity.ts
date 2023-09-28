import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  public _id: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string;
}
