import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EmailService } from 'src/apis/email/services/email.service';
import { TestEvent } from 'src/apis/users/events/test.event';
import { UserCreatedEvent } from 'src/apis/users/events/user-created.event';

@EventsHandler(UserCreatedEvent, TestEvent)
export class UserEventsHandler implements IEventHandler<UserCreatedEvent> {
  constructor(private readonly emailService: EmailService) {}

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
      case TestEvent.name: {
        console.log('TestEvent!');
        break;
      }
      default:
        break;
    }
  }
}
