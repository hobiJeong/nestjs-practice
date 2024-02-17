import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../constants/user-role.enum';
import { USER_ROLE_TOKEN } from '../constants/user-role.token';

export const Roles = (...roles: UserRole[]) =>
  SetMetadata(USER_ROLE_TOKEN, roles);
