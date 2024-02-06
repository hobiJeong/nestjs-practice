import { IsEmail, Length, Matches, MaxLength } from 'class-validator';
import { USER_REGEXP } from '../constants/user.regexp';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsIncludeEmptyString } from './validators/is-include-empty-string.validator';

export class CreateUserDto {
  // @Transform((params: TransformFnParams) => params.value.replaceAll(' ', ''))
  @IsIncludeEmptyString()
  @Length(2, 30)
  name: string;

  @IsEmail()
  @MaxLength(60)
  email: string;

  @Matches(USER_REGEXP)
  password: string;
}
