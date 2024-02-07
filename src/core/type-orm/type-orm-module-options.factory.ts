import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import typeOrmConfig from 'src/config/type-orm.config';

export class TypeOrmModuleOptionsFactory implements TypeOrmOptionsFactory {
  constructor(
    @Inject(typeOrmConfig.KEY)
    private readonly config: ConfigType<typeof typeOrmConfig>,
  ) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.config.host,
      username: this.config.user,
      password: this.config.password,
      database: this.config.name,
      port: this.config.port,
    };
  }
}
