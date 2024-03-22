import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAccessTokenGuard } from '../jwt/guards/jwt-access-token.guard';
import { User } from 'src/common/decorators/user.decorator';
import { UserDto } from 'src/apis/users/interface/dto/user.dto';
import { SignInRequestBodyDto } from '../dtos/sign-in-request-body.dto';
import { VerifyEmailDto } from 'src/apis/users/interface/dto/verify-email-dto';
import { AuthService } from '../services/auth.service';
import { JwtRefreshTokenGuard } from '../jwt/guards/jwt-refresh-token.guard';
import { CommandBus } from '@nestjs/cqrs';
import { VerifyEmailCommand } from 'src/apis/auth/commands/verify-email.command';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  @UseGuards(JwtAccessTokenGuard)
  findMyInfo(@User('id') user: UserDto) {
    return user;
  }

  @Post('sign-in')
  signIn(@Body() signInRequestBodyDto: SignInRequestBodyDto) {
    return this.authService.login(signInRequestBodyDto);
  }

  @Get('access-token')
  @UseGuards(JwtRefreshTokenGuard)
  renewAccessToken(@User('id') user: UserDto) {
    return user;
  }

  @Post('email-verify')
  verifyEmail(
    @Query() verifyEmailDto: VerifyEmailDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.commandBus.execute(new VerifyEmailCommand(verifyEmailDto));
  }
}
