import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { ApiModule } from './apis/api.module';
import { LoggerModule } from 'src/middlewares/logger.module';
import { BatchModule } from './apis/batch/batch.module';

@Module({
  imports: [CoreModule, ApiModule, LoggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(CustomLogger).forRoutes('*');
  // }
}
