import { Module } from '@nestjs/common';
import { ListsModule } from './lists/lists.module';
import { TypesModule } from './types/types.module';
import { AccountsModule } from './accounts/accounts.module';


@Module({
  imports: [ListsModule, TypesModule, AccountsModule],
})
export class AppModule{}
