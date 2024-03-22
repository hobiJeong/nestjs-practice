import { UUID } from 'crypto';
import { UserRole } from 'src/apis/users/constants/user-role.enum';
import { UserStatus } from 'src/apis/users/constants/user-status.enum';

export class User {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly email: string,
    readonly password: string,
    readonly signupVerifyToken: UUID,
    readonly status: UserStatus,
    readonly role: UserRole,
  ) {}
}
