import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { CommonModule } from 'src/common/common.module';
import { ConfigModule } from '@nestjs/config';
import emailConfig from 'src/core/config/email.config';
import * as Joi from 'joi';
import typeOrmConfig from 'src/core/config/type-orm.config';
import serverConfig from 'src/core/config/server.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptionsFactory } from './type-orm/type-orm-module-options.factory';
import authConfig from './config/auth.config';
import { WinstonModule } from 'nest-winston';
import { WinstonLoggerConfigFactory } from 'src/core/winston/winston-logger.config';

@Module({
  imports: [
    CommonModule,
    ConfigModule.forRoot({
      envFilePath: [`.${process.env.NODE_ENV}.env`],
      load: [emailConfig, typeOrmConfig, serverConfig, authConfig],
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        NODE_ENV: Joi.string().required(),

        EMAIL_SERVICE: Joi.string().required(),
        EMAIL_AUTH_USER: Joi.string().required(),
        EMAIL_AUTH_PASSWORD: Joi.string().required(),
        EMAIL_BASE_URL: Joi.string().required(),

        DB_HOST: Joi.string().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_PORT: Joi.number().required(),

        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmModuleOptionsFactory,
    }),
    /**
     * Winston Logger 사용 시 파일 혹은 데이터베이스에 저장, 혹은 상용 서비스라면 에러 정보, 호출 스택 등의 정보와 사용자가 추가한 로그를 파일에 기록하고
     * 기록된 파일을 외부 서비스에 다시 전달하여 검색과 시각화를 한다.
     * 구현시 웹 프레임워크나 서비스 업체에서 제공하는 라이브러리를 활용한다.
     */
    WinstonModule.forRootAsync({
      useClass: WinstonLoggerConfigFactory,
    }),
  ],
  providers: [CoreService, TypeOrmModuleOptionsFactory],
  exports: [CommonModule],
})
export class CoreModule {}
