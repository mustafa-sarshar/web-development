import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskStatusDto } from "./dto/update-task-status.dto";
import { FilterTasksDto } from "./dto/filter-tasks.dto";
import { Task } from "./entities/task.entity";

@Controller("tasks")
export class TasksController {
  constructor(private readonly _tasksService: TasksService) {}

  @Get()
  public getTasks(@Query() filterTasksDto: FilterTasksDto): Promise<Task[]> {
    return this._tasksService.getTasks(filterTasksDto);
  }

  @Get(":taskId")
  public async getTaskById(@Param("taskId") taskId: string): Promise<Task> {
    return this._tasksService.getTaskById(taskId);
  }

  @Post()
  public createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this._tasksService.createTask(createTaskDto);
  }

  @Delete(":taskId")
  public deleteTaskById(@Param("taskId") taskId: string): Promise<void> {
    return this._tasksService.deleteTaskById(taskId);
  }

  @Patch(":taskId/status")
  public updateTaskStatus(
    @Param("taskId") taskId: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    return this._tasksService.updateTaskStatus(taskId, updateTaskStatusDto);
  }
}
