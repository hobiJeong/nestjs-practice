import { ConflictException, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UUID } from 'crypto';
import { EmailService } from 'src/apis/email/services/email.service';
import { CreateUserCommand } from 'src/apis/users/commands/create-user.command';
import { UserDto } from 'src/apis/users/dto/user.dto';
import { UserRepository } from 'src/apis/users/repository/user.repository';
import * as uuid from 'uuid';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailService,
  ) {}
  async execute(command: CreateUserCommand): Promise<any> {
    const { name, email, password } = command;

    const isExistUser = await this.userRepository.existsBy({ email });

    if (isExistUser) {
      throw new ConflictException('An email that already exists.');
    }

    const signupVerifyToken = uuid.v1() as UUID;

    const newUser = this.userRepository.create({
      name,
      email,
      password,
      signupVerifyToken,
    });

    await this.userRepository.save(newUser);

    await this.emailService.sendMemberJoinVerification(
      newUser.email,
      signupVerifyToken,
    );

    return new UserDto(newUser);
  }
}
