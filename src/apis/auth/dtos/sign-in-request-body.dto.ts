import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from 'src/apis/users/dto/create-user.dto';

export class SignInRequestBodyDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}
