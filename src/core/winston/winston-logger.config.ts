import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import {
  WinstonModuleOptions,
  WinstonModuleOptionsFactory,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import serverConfig from 'src/core/config/server.config';
import * as winston from 'winston';

@Injectable()
export class WinstonLoggerConfigFactory implements WinstonModuleOptionsFactory {
  constructor(
    @Inject(serverConfig.KEY)
    private readonly config: ConfigType<typeof serverConfig>,
  ) {}

  createWinstonModuleOptions(): WinstonModuleOptions {
    return {
      transports: [
        new winston.transports.Console({
          level: this.config.nodeEnv === 'production' ? 'info' : 'silly',
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike('NestJSPractice', {
              prettyPrint: true,
            }),
          ),
        }),
      ],
    };
  }
}
