import { IEvent } from '@nestjs/cqrs';
import { CqrsEvent } from 'src/common/events/cqrs.event';

export class UserCreatedEvent extends CqrsEvent implements IEvent {
  constructor(
    readonly email: string,
    readonly signUpVerifyToken: string,
  ) {
    super(UserCreatedEvent.name);
  }
}
