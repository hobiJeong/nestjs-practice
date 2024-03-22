import { Module } from '@nestjs/common';
import { ExternalEmailService } from './services/external-email.service';
import { EXTERNAL_EMAIL_SERVICE_TOKEN } from 'src/apis/email/constants/external-email-service.token';

@Module({
  providers: [ExternalEmailService],
  exports: [ExternalEmailService],
})
export class EmailModule {}
