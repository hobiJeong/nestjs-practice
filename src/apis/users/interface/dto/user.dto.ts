import { Exclude } from 'class-transformer';
import { UUID } from 'crypto';
import { UserStatus } from '../../constants/user-status.enum';
import { UserRole } from '../../constants/user-role.enum';
import { UserEntity } from 'src/apis/users/infra/db/entities/User.entity';

export class UserDto implements UserEntity {
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
