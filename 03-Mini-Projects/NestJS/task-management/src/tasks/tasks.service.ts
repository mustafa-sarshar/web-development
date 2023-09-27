import { Injectable, NotFoundException } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";

import { Task, TaskStatus } from "./models/task.model";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskStatusDto } from "./dto/update-task-status.dto";
import { FilterTasksDto } from "./dto/filter-tasks.dto";

@Injectable()
export class TasksService {
  private _tasks: Task[] = [];

  public getAllTasks(): Task[] {
    return [...this._tasks];
  }

  public getAllTasksWithFilter(filterTasksDto: FilterTasksDto): Task[] {
    const { status, searchString } = filterTasksDto;
    let tasks: Task[] = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task: Task) => task.status === status);
    }

    if (searchString) {
      tasks = tasks.filter((task: Task) => {
        if (
          task.title.includes(searchString) ||
          task.description.includes(searchString)
        ) {
          return true;
        }
        return false;
      });
    }

    return [...tasks];
  }

  public createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const taskNew: Task = {
      _id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this._tasks.push(taskNew);
    return { ...taskNew };
  }

  public getTaskById(taskId: string): Task {
    const taskFound = this._tasks.find((task: Task) => task._id === taskId);

    if (!taskFound) {
      throw new NotFoundException();
    }

    return { ...taskFound };
  }

  public deleteTaskById(taskId: string): void {
    const taskFound: Task = this.getTaskById(taskId);

    this._tasks = this._tasks.filter(
      (task: Task) => task._id !== taskFound._id,
    );
  }

  public updateTaskStatus(
    taskId: string,
    updateTaskStatusDto: UpdateTaskStatusDto,
  ): Task {
    const { status } = updateTaskStatusDto;

    const taskUpdate = this.getTaskById(taskId);
    taskUpdate.status = status;

    return { ...taskUpdate };
  }
}
