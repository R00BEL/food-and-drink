import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ListsController } from './lists.controller';
import { ListsMiddleware } from './lists.middleware';
import { ListsService } from './lists.service';

@Module({
    controllers: [ListsController],
    providers: [ListsService],
})
export class ListsModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(ListsMiddleware)
        .forRoutes('lists');
    }
  }