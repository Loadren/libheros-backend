import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entity/user.entity';
import { Task } from '../../tasks/entity/task.entity';

@Entity()
export class List {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @ManyToOne(() => User, (user) => user.lists, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => Task, (task) => task.list, { cascade: true })
  tasks: Task[];
}
