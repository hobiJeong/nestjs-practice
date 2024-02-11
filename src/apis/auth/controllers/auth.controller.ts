import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../jwt/jwt.guard';
import { User } from 'src/common/decorators/user.decorator';
import { UserDto } from 'src/apis/users/dto/user.dto';
import { SignInRequestBodyDto } from '../dtos/sign-in-request-body.dto';
import { VerifyEmailDto } from 'src/apis/users/dto/verify-email-dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findMyInfo(@User() user: UserDto) {
    return user;
  }

  @Post('sign-in')
  signIn(@Body() signInRequestBodyDto: SignInRequestBodyDto) {
    return this.authService.login(signInRequestBodyDto);
  }

  @Post('email-verify')
  verifyEmail(@Query() verifyEmailDto: VerifyEmailDto): Promise<string> {
    return this.authService.verifyEmail(verifyEmailDto);
  }
}
