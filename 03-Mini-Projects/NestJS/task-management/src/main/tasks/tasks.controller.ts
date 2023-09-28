import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskStatusDto } from "./dto/update-task-status.dto";
import { FilterTasksDto } from "./dto/filter-tasks.dto";
import { Task } from "./entities/task.entity";
import { User } from "../users/entities/user.entity";
import { GetUser } from "../users/user.decorator";

@Controller("tasks")
@UseGuards(AuthGuard())
export class TasksController {
  private readonly _logger = new Logger("TasksController", { timestamp: true });

  constructor(private readonly _tasksService: TasksService) {}

  @Get()
  public getTasks(
    @Query() filterTasksDto: FilterTasksDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    this._logger.verbose(
      `User '${user.email}' retrieving all tasks. Filters: ${JSON.stringify(
        filterTasksDto,
      )}`,
    );
    return this._tasksService.getTasks(filterTasksDto, user);
  }

  @Get(":taskId")
  public async getTaskById(
    @Param("taskId") taskId: string,
    @GetUser() user: User,
  ): Promise<Task> {
    return this._tasksService.getTaskById(taskId, user);
  }

  @Post()
  public createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    this._logger.verbose(
      `User '${user.email}' created a task. Task: ${JSON.stringify(
        createTaskDto,
      )}`,
    );
    return this._tasksService.createTask(createTaskDto, user);
  }

  @Delete(":taskId")
  public deleteTaskById(
    @Param("taskId") taskId: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this._tasksService.deleteTaskById(taskId, user);
  }

  @Patch(":taskId/status")
  public updateTaskStatus(
    @Param("taskId") taskId: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this._tasksService.updateTaskStatus(
      taskId,
      updateTaskStatusDto,
      user,
    );
  }
}
