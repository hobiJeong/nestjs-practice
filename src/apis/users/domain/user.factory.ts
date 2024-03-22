import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { UUID } from 'crypto';
import { UserRole } from 'src/apis/users/constants/user-role.enum';
import { UserStatus } from 'src/apis/users/constants/user-status.enum';
import { User } from 'src/apis/users/domain/user';
import { UserCreatedEvent } from 'src/apis/users/domain/user-created.event';

@Injectable()
export class UserFactory {
  constructor(private readonly eventBus: EventBus) {}

  create(
    id: number,
    name: string,
    email: string,
    password: string,
    signUpVerifyToken: UUID,
    status: UserStatus,
    role: UserRole,
  ): User {
    const user = new User(
      id,
      name,
      email,
      password,
      signUpVerifyToken,
      status,
      role,
    );

    this.eventBus.publish(new UserCreatedEvent(email, signUpVerifyToken));

    return user;
  }

  reconstitute(
    id: number,
    name: string,
    email: string,
    signupVerifyToken: UUID,
    password: string,
    status: UserStatus,
    role: UserRole,
  ): User {
    return new User(id, name, email, password, signupVerifyToken, status, role);
  }
}
