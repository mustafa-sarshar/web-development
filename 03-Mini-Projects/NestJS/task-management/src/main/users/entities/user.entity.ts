import { Task } from "src/main/tasks/entities/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  public _id: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string;

  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  public tasks: Task[];
}
