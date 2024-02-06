import { IsEmail, IsString, Max, Min } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Min(1)
  @Max(10)
  name: string;

  @IsEmail()
  email: string;

  password: string;
}
