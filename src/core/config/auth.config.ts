import { registerAs } from '@nestjs/config';
import { AUTH_TOKEN } from './constants/env.token';

export default registerAs(AUTH_TOKEN, () => ({
  jwtSecret: process.env.JWT_SECRET,
}));
