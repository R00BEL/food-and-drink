import { Controller, Get, Post, Body, Req, Inject} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryeDto } from './dto/create-category.dto';
import { NEST_PGPROMISE_CONNECTION } from 'nestjs-pgpromise';
import { IDatabase } from 'pg-promise';

@Controller('category')
export class CategoryController {
  constructor(
    private categoryServise: CategoryService,
    @Inject(NEST_PGPROMISE_CONNECTION) private readonly pg: IDatabase<any>
  ){}
    
  @Get()
  categoryAll(@Req() req) {
    const userId:string = req.USER_ID
    return this.categoryServise.categoryAll(userId, this.pg);
  }

  @Post()
  categoryAdd(@Body() createtypeDto: CreateCategoryeDto, @Req() req) {
    const userId:string  = req.USER_ID
    return this.categoryServise.categoryAdd(createtypeDto, userId, this.pg);
  }
}
