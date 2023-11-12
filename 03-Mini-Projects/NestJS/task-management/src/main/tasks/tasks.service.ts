import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Task } from "./entities/task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskStatusDto } from "./dto/update-task-status.dto";
import { FilterTasksDto } from "./dto/filter-tasks.dto";
import { User } from "../users/entities/user.entity";

@Injectable()
export class TasksService {
  private readonly _logger: Logger = new Logger("TasksService", {
    timestamp: true,
  });

  constructor(
    @InjectRepository(Task) private readonly _tasksRepository: Repository<Task>,
  ) {}

  public async getTasks(
    filterTasksDto: FilterTasksDto,
    user: User,
  ): Promise<Task[]> {
    try {
      const { status, searchString } = filterTasksDto;
      const query = this._tasksRepository.createQueryBuilder("task");
      query.where({ user });

      if (status) {
        query.andWhere("task.statuss = :value", { value: status });
      }

      if (searchString) {
        query.andWhere(
          "(LOWER(task.title) LIKE :value OR LOWER(task.description) LIKE LOWER(:value))",
          {
            value: `%${searchString}%`,
          },
        );
      }

      const tasks: Task[] = await query.getMany();
      return [...tasks];
    } catch (err: any) {
      this._logger.error(
        `Failed to get tasks for user '${
          user.email
        }'. Filters: ${JSON.stringify(filterTasksDto)}`,
        err.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  public async getTaskById(taskId: string, user: User): Promise<Task> {
    const taskFound = await this._tasksRepository.findOne({
      where: { _id: taskId, user: user },
    });

    if (!taskFound) {
      throw new NotFoundException(`Task with ID '${taskId}' not found`);
    }

    return { ...taskFound };
  }

  public async createTask(
    createTaskDto: CreateTaskDto,
    user: User,
  ): Promise<Task> {
    const { title, description } = createTaskDto;
    const taskNew: Task = this._tasksRepository.create({
      title,
      description,
      user,
    });

    await this._tasksRepository.save(taskNew);

    return { ...taskNew };
  }

  public async deleteTaskById(taskId: string, user: User): Promise<void> {
    const result = await this._tasksRepository.delete({
      _id: taskId,
      user: user,
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID '${taskId}' not found!`);
    }
  }

  public async updateTaskStatus(
    taskId: string,
    updateTaskStatusDto: UpdateTaskStatusDto,
    user: User,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    const taskUpdate = await this.getTaskById(taskId, user);

    taskUpdate.status = status;
    await this._tasksRepository.save(taskUpdate);

    return { ...taskUpdate };
  }
}
