import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { ApiModule } from './apis/api.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UsersController } from './apis/users/controllers/users.controller';
import { AuthModule } from './api/auth/auth.module';

@Module({
  imports: [CoreModule, ApiModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(UsersController);
  }
}
