import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../jwt/jwt.guard';
import { User } from 'src/common/decorators/user.decorator';
import { UserDto } from 'src/apis/users/dto/user.dto';
import { SignInRequestBodyDto } from '../dtos/sign-in-request-body.dto';

@Controller('auth')
export class AuthController {
  @Get()
  @UseGuards(JwtAuthGuard)
  findMyInfo(@User() user: UserDto) {
    return user;
  }

  @Post()
  signIn(@Body() signInRequestBodyDto: SignInRequestBodyDto) {}
}
