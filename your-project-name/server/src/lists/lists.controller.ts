import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CreateListDto } from './dto/Create-list.dto';
import { ListsService } from './lists.service';

@Controller('lists')
export class ListsController {
    constructor(private listServise: ListsService){}
    
    @Get()
    listAll(@Req() req) {
        return this.listServise.listAll(req);
    }

    @Post()
    listAdd(@Body() createListDto: CreateListDto, @Req() req) {
        this.listServise.listAdd(createListDto, req);
    }

}
