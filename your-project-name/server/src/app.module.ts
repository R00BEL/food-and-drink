import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListsModule } from './lists/lists.module';
import { NestPgpromiseModule } from 'nestjs-pgpromise';
import { AccountsModule } from './accounts/accounts.module';
import { CategoryModule } from './category/category.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AccountsModule,
    ListsModule,
    CategoryModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    NestPgpromiseModule.register({
      connection: {
        host: 'localhost',
        port: 5432,
        database: process.env.BD,
        user: process.env.USER_BD,
        password: process.env.PASSWARD_BD,
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.USER_BD,
      password: process.env.PASSWARD_BD,
      database: process.env.BD,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
  ],
})
export class AppModule {}
