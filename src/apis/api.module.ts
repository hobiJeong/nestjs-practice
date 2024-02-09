import { Module } from '@nestjs/common';
import { UsersModule } from 'src/apis/users/users.module';
import { ApiController } from './api.controller';

@Module({
  imports: [UsersModule],
  controllers: [ApiController],
})
export class ApiModule {}
