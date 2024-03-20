import { Module } from '@nestjs/common';
import { HealthController } from './controllers/health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { DogHealthIndicator } from 'src/apis/health/indicators/dog-health.indicator';

@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [HealthController],
  providers: [DogHealthIndicator],
})
export class HealthModule {}
