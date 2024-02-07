import { registerAs } from '@nestjs/config';
import { NODE_ENV_TOKEN } from './constants/env.token';

export default registerAs(NODE_ENV_TOKEN, () => ({
  nodeEnv: process.env.NODE_ENV,
}));
