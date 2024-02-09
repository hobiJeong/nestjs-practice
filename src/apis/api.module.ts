import { Module } from '@nestjs/common';
import { UsersModule } from 'src/apis/users/users.module';
import { ApiController } from './api.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [ApiController],
})
export class ApiModule {}
