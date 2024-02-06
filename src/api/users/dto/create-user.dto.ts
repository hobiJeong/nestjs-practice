import { IsEmail, Length, Matches, MaxLength } from 'class-validator';
import { USER_REGEXP } from '../constants/user.regexp';
import { Transform, TransformFnParams } from 'class-transformer';

export class CreateUserDto {
  @Transform((params: TransformFnParams) => params.value.replaceAll(' ', ''))
  @Length(2, 30)
  name: string;

  @IsEmail()
  @MaxLength(60)
  email: string;

  @Matches(USER_REGEXP)
  password: string;
}
