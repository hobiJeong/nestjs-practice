import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import serverConfig from './core/config/server.config';
import emailConfig from './core/config/email.config';
import typeOrmConfig from './core/config/type-orm.config';

type CombineConfig = typeof serverConfig &
  typeof emailConfig &
  typeof typeOrmConfig;

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    @Inject(serverConfig.KEY)
    private readonly config: ConfigType<typeof serverConfig>,
    private readonly configService: ConfigService<CombineConfig, true>,
  ) {}
  getHello(): string {
    this.logger.error('level: error');
    this.logger.warn('level: warn');
    this.logger.log('level: log');
    this.logger.verbose('level: verbose');
    this.logger.debug('level: debug');

    return 'Hello World!';
  }

  getPort() {
    return this.config.port;
  }
}
