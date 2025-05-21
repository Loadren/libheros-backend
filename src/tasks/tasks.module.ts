import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './entity/task.entity';
import { List } from '../lists/entity/list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, List])],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
