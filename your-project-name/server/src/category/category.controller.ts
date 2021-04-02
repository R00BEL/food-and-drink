import { Controller, Get, Post, Body, Req} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryeDto } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryServise: CategoryService){}
    
  @Get()
  categoryAll(@Req() req) {
    const userId:string = req.USER_ID
    return this.categoryServise.categoryAll(userId);
  }

  @Post()
  categoryAdd(@Body() createtypeDto: CreateCategoryeDto, @Req() req) {
    const userId:string  = req.USER_ID
    return this.categoryServise.categoryAdd(createtypeDto, userId);
  }
}
