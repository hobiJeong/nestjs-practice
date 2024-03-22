import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { UUID } from 'crypto';
import { CreateUserCommand } from 'src/apis/users/applications/commands/create-user.command';
import * as uuid from 'uuid';
import { IUserRepository } from 'src/apis/users/domain/repository/iuser.repository';
import { UserRole } from 'src/apis/users/constants/user-role.enum';
import { UserStatus } from 'src/apis/users/constants/user-status.enum';
import { UserRepository } from 'src/apis/users/infra/db/repository/user.repository';
import { UserFactory } from 'src/apis/users/domain/user.factory';
import { IEmailService } from 'src/apis/users/applications/adapter/iemail.service';
import { EXTERNAL_EMAIL_SERVICE_TOKEN } from 'src/apis/email/constants/external-email-service.token';
import { EmailService } from 'src/apis/users/infra/adapter/email.service';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
    private readonly userFactory: UserFactory,
    @Inject(EmailService)
    private readonly emailService: IEmailService,
    private readonly eventBus: EventBus,
  ) {}
  async execute(command: CreateUserCommand): Promise<any> {
    const { name, email, password } = command;

    const isExistUser = await this.userRepository.findByEmail(email);

    console.log(isExistUser);

    if (isExistUser) {
      throw new ConflictException('An email that already exists.');
    }

    const signupVerifyToken = uuid.v1() as UUID;

    const user = await this.userRepository.saveUser(
      name,
      email,
      password,
      signupVerifyToken,
      UserStatus.Inactive,
      UserRole.User,
    );

    this.userFactory.create(
      user.id,
      user.name,
      user.email,
      user.password,
      user.signupVerifyToken,
      user.status,
      user.role,
    );
  }
}
