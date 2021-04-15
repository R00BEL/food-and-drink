import { Body, Controller, Get, Inject, Post, Req } from '@nestjs/common';
import { NEST_PGPROMISE_CONNECTION } from 'nestjs-pgpromise';
import { IDatabase } from 'pg-promise';
import { CreateListDto } from './dto/Create-list.dto';
import { ListsService } from './lists.service';

@Controller('lists')
export class ListsController {
    constructor(
        private listServise: ListsService,
        @Inject(NEST_PGPROMISE_CONNECTION) private readonly pg: IDatabase<any>
    ){}
    
    @Get()
    listAll(@Req() req) {
        const userId: string = req.USER_ID
        return this.listServise.listAll(userId, this.pg);
    }

    @Post()
    listAdd(@Body() createListDto: CreateListDto, @Req() req) {
        const userId: string = req.USER_ID
        this.listServise.listAdd(createListDto, userId, this.pg);
    }

}
