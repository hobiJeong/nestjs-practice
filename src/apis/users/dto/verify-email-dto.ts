import { IsUUID } from 'class-validator';

export class VerifyEmailDto {
  @IsUUID()
  signupVerifyToken: string;
}
