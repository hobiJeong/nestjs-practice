import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/apis/users/services/users.service';
import authConfig from 'src/core/config/auth.config';
import { Payload } from '../types/auth.type';
import { UserLoginDto } from 'src/apis/users/dto/user-login-dto';
import { VerifyEmailDto } from 'src/apis/users/dto/verify-email-dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(authConfig.KEY)
    private readonly config: ConfigType<typeof authConfig>,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async verifyEmail(verifyEmailDto: VerifyEmailDto) {
    const existUser = await this.usersService.findOneBy({
      where: { ...verifyEmailDto },
    });

    if (!existUser) {
      throw new NotFoundException('해당 유저를 찾지 못했습니다.');
    }

    return this.login({ ...existUser });
  }

  async login(userLoginDto: UserLoginDto) {
    const existUser = await this.usersService.findOneBy({
      select: ['id'],
      where: {
        ...userLoginDto,
      },
    });

    return this.generateToken({ ...existUser });
  }

  generateToken(payload: Payload) {
    return this.jwtService.sign(payload, { secret: this.config.jwtSecret });
  }
}
