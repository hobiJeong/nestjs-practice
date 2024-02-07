import { registerAs } from '@nestjs/config';
import { EMAIL_ENV_TOKEN } from './constants/env.token';

export default registerAs(EMAIL_ENV_TOKEN, () => ({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_AUTH_USER,
    pass: process.env.EMAIL_AUTH_PASSWORD,
  },
  baseUrl: process.env.EMAIL_BASE_URL,
}));
