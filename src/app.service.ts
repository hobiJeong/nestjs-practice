import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import serverConfig from './core/config/server.config';
import emailConfig from './core/config/email.config';
import typeOrmConfig from './core/config/type-orm.config';
import { CustomLogger } from 'src/middlewares/custom-logger.middleware';

type CombineConfig = typeof serverConfig &
  typeof emailConfig &
  typeof typeOrmConfig;

@Injectable()
export class AppService {
  constructor(
    @Inject(serverConfig.KEY)
    private readonly config: ConfigType<typeof serverConfig>,
    private readonly customLogger: CustomLogger,
  ) {}
  getHello(): string {
    console.log('hi');
    this.customLogger.error('level: error');
    this.customLogger.warn('level: warn');
    this.customLogger.log('level: log');
    this.customLogger.verbose('level: verbose');
    this.customLogger.debug('level: debug');

    return 'Hello World!';
  }

  getPort() {
    return this.config.port;
  }
}
