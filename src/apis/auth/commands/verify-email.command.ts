import { ICommand } from '@nestjs/cqrs';
import { VerifyEmailDto } from 'src/apis/users/interface/dto/verify-email-dto';

export class VerifyEmailCommand implements ICommand {
  constructor(readonly verifyEmailDto: VerifyEmailDto) {}
}
