import { Controller, Get, Post, Body} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryeDto } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryServise: CategoryService){}
    
  @Get()
  categoryAll() {
      return this.categoryServise.categoryAll();
  }

  @Post()
  categoryAdd(@Body() createtypeDto: CreateCategoryeDto) {
      return this.categoryServise.categoryAdd(createtypeDto);
  }
}
