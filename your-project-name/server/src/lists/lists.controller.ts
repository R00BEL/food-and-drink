import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CreateListDto } from './dto/Create-list.dto';
import { ListsService } from './lists.service';

@Controller('lists')
export class ListsController {
  constructor(private listServise: ListsService) {}

  @Get()
  listAll(@Req() req) {
    const userId: string = req.USER_ID;
    return this.listServise.listAll(userId);
  }

  @Post()
  listAdd(@Body() createListDto: CreateListDto, @Req() req) {
    const userId: string = req.USER_ID;
    this.listServise.listAdd(createListDto, userId);
  }
}
