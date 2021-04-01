import { Module } from '@nestjs/common';
import { ListsModule } from './lists/lists.module';
import { AccountsModule } from './accounts/accounts.module';
import { CategoryModule } from './category/category.module';


@Module({
  imports: [ListsModule, AccountsModule, CategoryModule],
})
export class AppModule{}
