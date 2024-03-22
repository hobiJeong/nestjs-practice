import { IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class VerifyEmailDto {
  @IsUUID()
  signupVerifyToken: UUID;
}
