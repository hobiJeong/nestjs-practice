import { Exclude } from 'class-transformer';
import { User } from 'src/entities/User';

export class UserDto implements User {
  id: number;

  name: string;

  email: string;

  @Exclude()
  password: string;

  @Exclude()
  signupVerifyToken: string;

  createdAt: Date;

  updatedAt: Date;

  @Exclude()
  deletedAt: Date;

  constructor(userDto: UserDto) {
    Object.assign(this, userDto);
  }
}
