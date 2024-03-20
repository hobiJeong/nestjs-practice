import { Module } from '@nestjs/common';
import { UsersModule } from 'src/apis/users/users.module';
import { ApiController } from './api.controller';
import { AuthModule } from './auth/auth.module';
import { BatchModule } from 'src/apis/batch/batch.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [UsersModule, AuthModule, BatchModule, HealthModule],
  controllers: [ApiController],
})
export class ApiModule {}
