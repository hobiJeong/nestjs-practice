import { Injectable } from '@nestjs/common';
import { ExternalEmailService } from 'src/apis/email/services/external-email.service';
import { IEmailService } from 'src/apis/users/applications/adapter/iemail.service';

@Injectable()
export class EmailService implements IEmailService {
  constructor(private readonly emailService: ExternalEmailService) {}
  sendMemberJoinVerification(
    email: string,
    signupVerifyToken: string,
  ): Promise<void> {
    return this.emailService.sendMemberJoinVerification(
      email,
      signupVerifyToken,
    );
  }
}
