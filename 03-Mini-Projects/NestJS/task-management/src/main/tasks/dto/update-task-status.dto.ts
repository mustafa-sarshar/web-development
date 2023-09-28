import { IsEnum, IsNotEmpty } from "class-validator";
import { TaskStatus } from "../models/task.model";

export class UpdateTaskStatusDto {
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  public status: TaskStatus;
}
