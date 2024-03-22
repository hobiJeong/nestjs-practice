import { UUID } from 'crypto';
import { UserRole } from 'src/apis/users/constants/user-role.enum';
import { UserStatus } from 'src/apis/users/constants/user-status.enum';
import { User } from 'src/apis/users/domain/user';
import { UserDto } from 'src/apis/users/interface/dto/user.dto';

export interface IUserRepository {
  findByEmail: (email: string) => Promise<User | null>;
  saveUser: (
    name: string,
    email: string,
    password: string,
    signupVerifyToken: UUID,
    status: UserStatus,
    role: UserRole,
  ) => Promise<User>;
}
