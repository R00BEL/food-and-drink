import { Module } from '@nestjs/common';
import { ListsModule } from './lists/lists.module';
import { AccountsModule } from './accounts/accounts.module';
import { CategoryModule } from './category/category.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [ListsModule, AccountsModule, CategoryModule, ConfigModule.forRoot({
    isGlobal: true,
  })],
})
export class AppModule{}
