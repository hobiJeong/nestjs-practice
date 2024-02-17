import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import authConfig from 'src/core/config/auth.config';
import { Payload } from '../../types/auth.type';
import { UsersService } from 'src/apis/users/services/users.service';
import { UserStatus } from 'src/apis/users/constants/user-status.enum';

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(authConfig.KEY)
    private readonly config: ConfigType<typeof authConfig>,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwtAccessTokenSecret,
    });
  }

  async validate(payload: Payload) {
    console.log(2);

    const existUser = await this.usersService.findOne({
      where: { id: payload.id, status: UserStatus.Active },
    });

    if (!existUser) {
      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }

    return existUser;
  }
}
