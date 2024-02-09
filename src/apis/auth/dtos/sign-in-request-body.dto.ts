import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from 'src/apis/users/dto/create-user.dto';
import { UserDto } from 'src/apis/users/dto/user.dto';

export class SignInRequestBodyDto extends OmitType(CreateUserDto, [
  'email',
  'password',
]) {}
