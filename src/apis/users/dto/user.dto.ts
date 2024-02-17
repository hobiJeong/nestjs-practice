import { Exclude } from 'class-transformer';
import { UUID } from 'crypto';
import { User } from 'src/entities/User';
import { UserStatus } from '../constants/user-status.enum';
import { UserRole } from '../constants/user-role.enum';

export class UserDto implements User {
  id: number;

  name: string;

  email: string;

  @Exclude()
  password: string;

  @Exclude()
  signupVerifyToken: UUID;

  @Exclude()
  status: UserStatus;

  @Exclude()
  role: UserRole;

  createdAt: Date;

  updatedAt: Date;

  @Exclude()
  deletedAt: Date;

  constructor(userDto: UserDto) {
    Object.assign(this, userDto);
  }
}
