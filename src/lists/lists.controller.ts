import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
import { List } from './entity/list.entity';
import { RequestWithUser } from '../auth/interfaces/request-with-user.interface';

@Controller('lists')
@UseGuards(JwtAuthGuard)
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Get()
  async all(@Request() req: RequestWithUser): Promise<List[]> {
    return this.listsService.findAll(req.user.id);
  }

  @Get(':id')
  async one(
    @Request() req: RequestWithUser,
    @Param('id') id: string,
  ): Promise<List> {
    return this.listsService.findOne(req.user.id, id);
  }

  @Post()
  async create(
    @Request() req: RequestWithUser,
    @Body() dto: CreateListDto,
  ): Promise<List> {
    return this.listsService.create(req.user.id, dto);
  }

  @Delete(':id')
  async remove(
    @Request() req: RequestWithUser,
    @Param('id') id: string,
  ): Promise<{ deleted: boolean }> {
    await this.listsService.remove(req.user.id, id);
    return { deleted: true };
  }
}
