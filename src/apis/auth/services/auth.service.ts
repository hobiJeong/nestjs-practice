import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/apis/users/services/users.service';
import authConfig from 'src/core/config/auth.config';
import { User } from 'src/entities/User';
import { Payload } from '../types/auth.type';
import { UserLoginDto } from 'src/apis/users/dto/user-login-dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(authConfig.KEY)
    private readonly config: ConfigType<typeof authConfig>,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

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
