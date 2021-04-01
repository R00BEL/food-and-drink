import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateListDto } from './dto/Create-list.dto';
import { ListsService } from './lists.service';

@Controller('lists')
export class ListsController {
    constructor(private listServise: ListsService){}
    
    @Get()
    listAll() {
        return this.listServise.listAll();
    }

    @Post()
    listAdd(@Body() createListDto: CreateListDto) {
        this.listServise.listAdd(createListDto);
    }

}
