import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypesController } from './types.controller';
import { TypesMiddleware } from './types.middleware';
import { TypesService } from './types.service';

@Module({
    controllers: [TypesController],
    providers: [TypesService],
})
export class TypesModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(TypesMiddleware)
        .forRoutes('types');
    }
  }
