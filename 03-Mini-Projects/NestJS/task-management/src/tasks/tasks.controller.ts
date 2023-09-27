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
import { Task, TaskStatus } from "./models/task.model";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskStatusDto } from "./dto/update-task-status.dto";
import { FilterTasksDto } from "./dto/filter-tasks.dto";

@Controller("tasks")
export class TasksController {
  constructor(private readonly _tasksService: TasksService) {}

  @Get()
  public getTasks(@Query() filterTasksDto: FilterTasksDto): Task[] {
    if (Object.keys(filterTasksDto).length) {
      return this._tasksService.getAllTasksWithFilter(filterTasksDto);
    }
    return this._tasksService.getAllTasks();
  }

  @Get(":taskId")
  public getTaskById(@Param("taskId") taskId: string): Task {
    return this._tasksService.getTaskById(taskId);
  }

  @Post()
  public createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this._tasksService.createTask(createTaskDto);
  }

  @Delete(":taskId")
  public deleteTaskById(@Param("taskId") taskId: string): void {
    return this._tasksService.deleteTaskById(taskId);
  }

  @Patch(":taskId/status")
  public updateTaskStatus(
    @Param("taskId") taskId: string,
    @Body("status") updateTaskStatusDto: UpdateTaskStatusDto,
  ): Task {
    return this._tasksService.updateTaskStatus(taskId, updateTaskStatusDto);
  }
}
