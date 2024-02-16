import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { UsersService } from 'src/apis/users/services/users.service';
import authConfig from 'src/core/config/auth.config';
import { Payload } from '../types/auth.type';
import { UserLoginDto } from 'src/apis/users/dto/user-login-dto';
import { VerifyEmailDto } from 'src/apis/users/dto/verify-email-dto';
import { JwtService } from '@nestjs/jwt';
import { UserStatus } from 'src/apis/users/constants/user-status.enum';

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
      where: { ...verifyEmailDto, status: UserStatus.Inactive },
    });

    if (!existUser) {
      throw new NotFoundException('해당 유저를 찾지 못했습니다.');
    }

    await this.usersService.verifyUser(
      verifyEmailDto.signupVerifyToken,
      existUser.id,
    );

    return this.login({ ...existUser });
  }

  async login(userLoginDto: UserLoginDto) {
    const existUser = await this.usersService.findOneBy({
      select: ['id'],
      where: {
        ...userLoginDto,
        status: UserStatus.Active,
      },
    });

    if (existUser) {
      throw new NotFoundException('해당 유저를 찾을 수 없습니다.');
    }

    return {
      accessToken: this.generateAccessToken({ ...existUser }),
      refreshToken: this.generateRefreshToken({ ...existUser }),
    };
  }

  generateAccessToken(payload: Payload) {
    return this.jwtService.sign(payload, {
      expiresIn: '1d',
    });
  }

  generateRefreshToken(payload: Payload) {
    return this.jwtService.sign(payload, {
      expiresIn: '10 days',
    });
  }

  renewAccessToken(refreshToken: string) {
    const payload: Payload = this.jwtService.verify(refreshToken);

    return this.generateAccessToken(payload);
  }
}
