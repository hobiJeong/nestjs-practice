import { IEvent } from '@nestjs/cqrs';
import { CqrsEvent } from 'src/common/events/cqrs.event';

export class TestEvent extends CqrsEvent implements IEvent {
  constructor() {
    super(TestEvent.name);
  }
}
