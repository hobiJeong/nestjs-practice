import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import authConfig from 'src/core/config/auth.config';

@Injectable()
export class JwtServiceFactory {
  constructor(
    @Inject(authConfig.KEY)
    private readonly config: ConfigType<typeof authConfig>,
  ) {}
  createAccessTokenJwtService() {
    return new JwtService({
      secret: this.config.jwtAccessTokenSecret,
      signOptions: {
        expiresIn: '1 days',
        subject: 'accessToken',
      },
    });
  }

  createRefreshTokenJwtService() {
    return new JwtService({
      secret: this.config.jwtRefreshTokenSecret,
      signOptions: {
        expiresIn: '10 days',
        subject: 'refreshToken',
      },
    });
  }
}
