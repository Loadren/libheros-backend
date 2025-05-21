import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { List } from '../../lists/entity/list.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  shortDesc: string;

  @Column({ type: 'text', nullable: true })
  longDesc: string;

  @Column({ type: 'timestamptz' })
  dueDate: Date;

  @Column({ default: false })
  completed: boolean;

  @ManyToOne(() => List, (list) => list.tasks, { onDelete: 'CASCADE' })
  list: List;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
