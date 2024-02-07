import { registerAs } from '@nestjs/config';
import { DATABASE_ENV_TOKEN } from './constants/env.token';

export default registerAs(DATABASE_ENV_TOKEN, () => ({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  name: process.env.DB_NAME,
  port: +process.env.DB_PORT,
}));
