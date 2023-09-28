import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Task } from "./entities/task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskStatusDto } from "./dto/update-task-status.dto";
import { FilterTasksDto } from "./dto/filter-tasks.dto";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly _tasksRepository: Repository<Task>,
  ) {}

  public async getTasks(filterTasksDto: FilterTasksDto): Promise<Task[]> {
    const { status, searchString } = filterTasksDto;
    const query = this._tasksRepository.createQueryBuilder("task");

    if (status) {
      query.andWhere("task.status = :value", { value: status });
    }

    if (searchString) {
      query.andWhere(
        "LOWER(task.title) LIKE :value OR LOWER(task.description) LIKE LOWER(:value)",
        {
          value: `%${searchString}%`,
        },
      );
    }

    const tasks: Task[] = await query.getMany();
    return [...tasks];
  }

  public async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const taskNew: Task = this._tasksRepository.create({
      title,
      description,
    });

    await this._tasksRepository.save(taskNew);

    return { ...taskNew };
  }

  public async getTaskById(taskId: string): Promise<Task> {
    const taskFound = await this._tasksRepository.findOne({
      where: { _id: taskId },
    });

    if (!taskFound) {
      throw new NotFoundException(`Task with ID '${taskId}' not found`);
    }

    return { ...taskFound };
  }

  public async deleteTaskById(taskId: string): Promise<void> {
    const result = await this._tasksRepository.delete(taskId);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID '${taskId}' not found!`);
    }
  }

  public async updateTaskStatus(
    taskId: string,
    updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    const taskUpdate = await this.getTaskById(taskId);

    taskUpdate.status = status;
    await this._tasksRepository.save(taskUpdate);

    return { ...taskUpdate };
  }
}
