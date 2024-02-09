import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { sign } from 'jsonwebtoken';
import authConfig from 'src/core/config/auth.config';
import { User } from 'src/entities/User';

@Injectable()
export class AuthService {
  constructor(
    @Inject(authConfig.KEY)
    private readonly config: ConfigType<typeof authConfig>,
  ) {}

  login(user: User) {
    const payload = { ...user };

    return sign(payload, this.config.jwtSecret, {
      expiresIn: '1d',
      audience: 'anbb',
    });
  }
}
