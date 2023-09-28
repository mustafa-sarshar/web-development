import { IsEnum, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../models/task.model";

export class FilterTasksDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  searchString?: string;
}
