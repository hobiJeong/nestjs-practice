import { IEvent } from '@nestjs/cqrs';
import { CqrsEvent } from 'src/apis/users/domain/cqrs.event';

export class UserCreatedEvent extends CqrsEvent implements IEvent {
  constructor(
    readonly email: string,
    readonly signUpVerifyToken: string,
  ) {
    super(UserCreatedEvent.name);
  }
}
