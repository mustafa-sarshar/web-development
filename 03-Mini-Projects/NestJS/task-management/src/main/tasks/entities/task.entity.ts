import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";

import { TaskStatus } from "../models/task.model";
import { User } from "src/main/users/entities/user.entity";

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

  @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
  @Exclude({ toPlainOnly: true })
  public user: User;
}
