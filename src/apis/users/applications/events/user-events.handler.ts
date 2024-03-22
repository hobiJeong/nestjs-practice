import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { IEmailService } from 'src/apis/users/applications/adapter/iemail.service';
import { UserCreatedEvent } from 'src/apis/users/domain/user-created.event';
import { EmailService } from 'src/apis/users/infra/adapter/email.service';

@EventsHandler(UserCreatedEvent)
export class UserEventsHandler implements IEventHandler<UserCreatedEvent> {
  constructor(
    @Inject(EmailService) private readonly emailService: IEmailService,
  ) {}

  async handle(event: UserCreatedEvent) {
    console.log('test');

    switch (event.name) {
      case UserCreatedEvent.name: {
        console.log('UserCreatedEvent!');

        const { email, signUpVerifyToken } = event;

        await this.emailService.sendMemberJoinVerification(
          email,
          signUpVerifyToken,
        );
        break;
      }

      default:
        break;
    }
  }
}
