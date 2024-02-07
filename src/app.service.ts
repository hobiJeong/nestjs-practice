import { Inject, Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import serverConfig from './core/config/server.config';
import emailConfig from './core/config/email.config';
import typeOrmConfig from './core/config/type-orm.config';

type CombineConfig = typeof serverConfig &
  typeof emailConfig &
  typeof typeOrmConfig;

@Injectable()
export class AppService {
  constructor(
    @Inject(serverConfig.KEY)
    private readonly config: ConfigType<typeof serverConfig>,
    private readonly configService: ConfigService<CombineConfig, true>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  getPort() {
    return this.config.port;
  }
}
