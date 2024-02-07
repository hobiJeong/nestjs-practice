import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import serverConfig from './config/server.config';

@Injectable()
export class AppService {
  constructor(
    @Inject(serverConfig.KEY)
    private readonly config: ConfigType<typeof serverConfig>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  getPort() {
    return this.config.port;
  }
}
