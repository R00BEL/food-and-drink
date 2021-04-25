import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryMiddleware } from './category.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from './entity/categories.entity';
import { Category_user } from './entity/category_user.entity';
import { Accounts } from 'src/accounts/acounts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categories, Category_user, Accounts])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CategoryMiddleware).forRoutes('category');
  }
}
