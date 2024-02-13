import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAccessTokenGuard } from '../jwt/jwt-access-token.guard';
import { User } from 'src/common/decorators/user.decorator';
import { UserDto } from 'src/apis/users/dto/user.dto';
import { SignInRequestBodyDto } from '../dtos/sign-in-request-body.dto';
import { VerifyEmailDto } from 'src/apis/users/dto/verify-email-dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(JwtAccessTokenGuard)
  findMyInfo(@User('id') user: UserDto) {
    console.log(user);
    return user;
  }

  @Post('sign-in')
  signIn(@Body() signInRequestBodyDto: SignInRequestBodyDto) {
    return this.authService.login(signInRequestBodyDto);
  }

  @Post('email-verify')
  verifyEmail(
    @Query() verifyEmailDto: VerifyEmailDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.authService.verifyEmail(verifyEmailDto);
  }
}
