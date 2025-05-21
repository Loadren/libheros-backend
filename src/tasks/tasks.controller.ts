import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entity/task.entity';
import { RequestWithUser } from '../auth/interfaces/request-with-user.interface';

@Controller()
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('lists/:listId/tasks')
  async all(
    @Request() req: RequestWithUser,
    @Param('listId') listId: string,
    @Query('completed') completed?: string,
  ): Promise<Task[]> {
    const isCompleted: boolean | undefined =
      completed !== undefined ? completed === 'true' : undefined;
    return this.tasksService.findAll(req.user.id, listId, isCompleted);
  }

  @Post('lists/:listId/tasks')
  async create(
    @Request() req: RequestWithUser,
    @Param('listId') listId: string,
    @Body() dto: CreateTaskDto,
  ): Promise<Task> {
    return this.tasksService.create(req.user.id, listId, dto);
  }

  @Get('tasks/:id')
  async one(
    @Request() req: RequestWithUser,
    @Param('id') id: string,
  ): Promise<Task> {
    return this.tasksService.findOne(req.user.id, id);
  }

  @Patch('tasks/:id')
  async update(
    @Request() req: RequestWithUser,
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.update(req.user.id, id, dto);
  }

  @Delete('tasks/:id')
  async remove(
    @Request() req: RequestWithUser,
    @Param('id') id: string,
  ): Promise<{ deleted: boolean }> {
    await this.tasksService.remove(req.user.id, id);
    return { deleted: true };
  }
}
