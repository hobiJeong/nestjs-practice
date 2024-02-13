import { registerAs } from '@nestjs/config';
import { AUTH_TOKEN } from './constants/env.token';

export default registerAs(AUTH_TOKEN, () => ({
  jwtAccessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
  jwtRefreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
}));
