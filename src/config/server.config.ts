import { registerAs } from '@nestjs/config';
import { SERVER_TOKEN } from './constants/env.token';

export default registerAs(SERVER_TOKEN, () => ({
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
}));
