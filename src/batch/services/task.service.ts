import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  @Cron(CronExpression.MONDAY_TO_FRIDAY_AT_1PM, { name: 'cronTask' })
  handleCron() {
    this.logger.log('Task Called');
  }

  @Interval('intervalTask', 3000)
  handleInterval() {
    this.logger.log('Task Called by interval');
  }

  @Timeout('timeoutTask', 5000)
  handleTimeout() {
    this.logger.log('Task Called by timeout');
  }
}
