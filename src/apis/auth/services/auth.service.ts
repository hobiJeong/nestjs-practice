import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { sign } from 'jsonwebtoken';
import { UsersService } from 'src/apis/users/services/users.service';
import authConfig from 'src/core/config/auth.config';
import { User } from 'src/entities/User';

@Injectable()
export class AuthService {
  constructor(
    @Inject(authConfig.KEY)
    private readonly config: ConfigType<typeof authConfig>,
    private readonly usersService: UsersService,
  ) {}

  login(user: User) {
    const existUser = await this.usersService.findOneBy({
      where: {
        email: user.email,
        password: user.password,
      },
    });
    const payload = { ...user };

    return sign(payload, this.config.jwtSecret, {
      expiresIn: '1d',
      audience: 'anbb',
    });
  }
}
