import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import authConfig from 'src/core/config/auth.config';
import { Payload } from '../types/auth.type';
import { UsersService } from 'src/apis/users/services/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    @Inject(authConfig.KEY)
    private readonly config: ConfigType<typeof authConfig>,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwtRefreshTokenSecret,
    });
  }

  async validate(payload: Payload) {
    const existUser = await this.usersService.findOneUser(payload.id);

    if (!existUser) {
      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }

    return existUser;
  }
}
