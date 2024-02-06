import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ApiController } from './api/api.controller';
import { CommonModule } from './common/common.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [UsersModule, CommonModule, CoreModule],
  controllers: [ApiController, AppController],
  providers: [AppService],
})
export class AppModule {}
