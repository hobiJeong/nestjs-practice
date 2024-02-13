import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import authConfig from 'src/core/config/auth.config';

@Injectable()
export class JwtModuleOptionsFactory implements JwtOptionsFactory {
  constructor(
    @Inject(authConfig.KEY)
    private readonly config: ConfigType<typeof authConfig>,
  ) {}

  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.config.jwtAccessTokenSecret,
      signOptions: {
        expiresIn: '1 days',
      },
    };
  }
}
