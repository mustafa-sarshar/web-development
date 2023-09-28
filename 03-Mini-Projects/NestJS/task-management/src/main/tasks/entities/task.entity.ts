import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "../models/task.model";

@Entity()
export class Task {
  @PrimaryGeneratedColumn("uuid")
  public _id: string;

  @Column()
  public title: string;

  @Column()
  public description: string;

  @Column({ default: "OPEN" })
  public status: TaskStatus;
}
