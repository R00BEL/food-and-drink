import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { TypesService } from './types.service';

@Controller('types')
export class TypesController {
    constructor(private typesServise: TypesService){}
    
    @Get()
    typeAll(@Req() req) {
        return this.typesServise.typeAll(req);
    }

    @Post()
    typeAdd(@Body() createtypeDto: CreateTypeDto, @Req() req) {
        return this.typesServise.typeAdd(createtypeDto, req);
    }

}
