import { Module } from '@nestjs/common';
import { TaskService } from './services/task.service';
import { ScheduleModule } from '@nestjs/schedule';
import { BatchController } from 'src/apis/batch/controllers/batch.controller';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [BatchController],
  providers: [TaskService],
})
export class BatchModule {}
