import { Module } from '@nestjs/common';
import { TaskService } from './services/task.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [TaskService],
})
export class BatchModule {}
