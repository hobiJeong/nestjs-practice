import { IsEmail, Length, Matches, MaxLength } from 'class-validator';
import { USER_REGEXP } from '../constants/user.regexp';

export class CreateUserDto {
  @Length(2, 30)
  name: string;

  @IsEmail()
  @MaxLength(60)
  email: string;

  @Matches(USER_REGEXP)
  password: string;
}
