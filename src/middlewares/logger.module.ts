import { Module } from '@nestjs/common';
import { CustomLogger } from 'src/middlewares/custom-logger.middleware';

@Module({
  providers: [CustomLogger],
  exports: [CustomLogger],
})
export class LoggerModule {}
