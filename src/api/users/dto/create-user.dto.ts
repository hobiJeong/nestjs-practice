import { IsEmail, Length, Matches, MaxLength } from 'class-validator';
import { USER_REGEXP } from '../constants/user.regexp';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsIncludeEmptyString } from './validators/is-include-empty-string.validator';
import { BadRequestException } from '@nestjs/common';

export class CreateUserDto {
  /**
   * 공백이 들어올 시 공백없이 처리 혹은 custom validator로 에러 발생
   */
  @Transform((params: TransformFnParams) => {
    const { obj, value } = params;
    if (obj.password.includes(value.replaceAll(' ', ''))) {
      throw new BadRequestException(
        'password must not contain the same string as name.',
      );
    }
    return value.replaceAll(' ', '');
  })
  @IsIncludeEmptyString()
  @Length(2, 30)
  name: string;

  @IsEmail()
  @MaxLength(60)
  email: string;

  @Matches(USER_REGEXP)
  password: string;
}
