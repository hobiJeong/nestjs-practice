import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { ApiModule } from './apis/api.module';
import { LoggerModule } from 'src/middlewares/logger.module';
import { BatchModuleModule } from './batch-module/batch-module.module';
import { BatchModule } from './batch/batch.module';
import { TaskService } from './src/batch/task/task.service';

@Module({
  imports: [CoreModule, ApiModule, LoggerModule, BatchModuleModule, BatchModule],
  controllers: [AppController],
  providers: [AppService, TaskService],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(CustomLogger).forRoutes('*');
  // }
}
