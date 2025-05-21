import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
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
    const query = this.taskRepo
      .createQueryBuilder('task')
      .innerJoin('task.list', 'list')
      .where('list.id = :listId', { listId })
      .andWhere('list.userId = :userId', { userId });
    if (completed !== undefined) {
      query.andWhere('task.completed = :completed', { completed });
    }
    return query.getMany();
  }

  async findOne(userId: string, id: string): Promise<Task> {
    const task = await this.taskRepo
      .createQueryBuilder('task')
      .innerJoin('task.list', 'list')
      .where('task.id = :id', { id })
      .andWhere('list.userId = :userId', { userId })
      .getOne();
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
    const result: DeleteResult = await this.taskRepo
      .createQueryBuilder()
      .delete()
      .from(Task)
      .where('id = :id', { id })
      .andWhere('list.user.id = :userId', { userId })
      .execute();
    if (result.affected === 0) throw new NotFoundException('Task not found');
  }
}
