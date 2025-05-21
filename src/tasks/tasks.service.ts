import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Task } from './entity/task.entity';
import { List } from '../lists/entity/list.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly taskRepo: Repository<Task>,
    @InjectRepository(List) private readonly listRepo: Repository<List>,
  ) {}

  async create(
    userId: string,
    listId: string,
    dto: CreateTaskDto,
  ): Promise<Task> {
    const list = await this.listRepo.findOne({
      where: { id: listId, user: { id: userId } },
    });
    if (!list) throw new NotFoundException('List not found');
    const dueDate = new Date(dto.dueDate);
    const task = this.taskRepo.create({ ...dto, dueDate, list });
    return this.taskRepo.save(task);
  }

  async findAll(
    userId: string,
    listId: string,
    completed?: boolean,
  ): Promise<Task[]> {
    // Build a strongly-typed where object
    const where: FindOptionsWhere<Task> = {
      list: { id: listId, user: { id: userId } },
      // only include completed if it was passed in
      ...(completed !== undefined ? { completed } : {}),
    };

    return this.taskRepo.find({
      where,
      relations: ['list', 'list.user'],
    });
  }

  async findOne(userId: string, id: string): Promise<Task> {
    const where: FindOptionsWhere<Task> = {
      id,
      list: { user: { id: userId } },
    };

    const task = await this.taskRepo.findOne({
      where,
      relations: ['list', 'list.user'],
    });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(userId: string, id: string, dto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(userId, id);
    Object.assign(task, dto);
    if (dto.dueDate) {
      const dueDate = new Date(dto.dueDate);
      task.dueDate = dueDate;
    }
    return this.taskRepo.save(task);
  }

  async remove(userId: string, id: string): Promise<void> {
    const task = await this.findOne(userId, id);
    await this.taskRepo.remove(task);
  }
}
