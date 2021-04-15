import { Module } from '@nestjs/common';
import { ListsModule } from './lists/lists.module';
import { NestPgpromiseModule } from 'nestjs-pgpromise';
import { ConfigService } from '@nestjs/config';
import { AccountsModule } from './accounts/accounts.module';
import { CategoryModule } from './category/category.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ListsModule,
    AccountsModule, 
    CategoryModule, ConfigModule.forRoot({
      isGlobal: true,
  }),
    NestPgpromiseModule.register({
      connection: {
        host: 'localhost',
        port: 5432,
        database: 'mybeloved',
        user: 'postgres',
        password: '5335',
      },
    }),
  ]
})
export class AppModule{}
