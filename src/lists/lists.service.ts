import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { List } from './entity/list.entity';
import { CreateListDto } from './dto/create-list.dto';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(List) private readonly listRepo: Repository<List>,
  ) {}

  async create(userId: string, dto: CreateListDto): Promise<List> {
    const exists = await this.listRepo.findOne({
      where: { name: dto.name, user: { id: userId } },
    });
    if (exists) throw new BadRequestException('List name already exists');
    const list = this.listRepo.create({
      name: dto.name,
      user: { id: userId },
    });
    return this.listRepo.save(list);
  }

  async findAll(userId: string): Promise<List[]> {
    return this.listRepo.find({
      where: { user: { id: userId } },
      relations: ['tasks'],
    });
  }

  async findOne(userId: string, id: string): Promise<List> {
    const list = await this.listRepo.findOne({
      where: { id, user: { id: userId } },
      relations: ['tasks'],
    });
    if (!list) throw new NotFoundException('List not found');
    return list;
  }

  async remove(userId: string, id: string): Promise<void> {
    const res = await this.listRepo.delete({ id, user: { id: userId } });
    if (res.affected === 0) throw new NotFoundException('List not found');
  }
}
