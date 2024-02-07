import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { CommonModule } from 'src/common/common.module';
import { ConfigModule } from '@nestjs/config';
import emailConfig from 'src/config/email.config';
import * as Joi from 'joi';
import typeOrmConfig from 'src/config/type-orm.config';
import nodeEnvConfig from 'src/config/node-env.config';

@Module({
  imports: [
    CommonModule,
    ConfigModule.forRoot({
      envFilePath: [`.${process.env.NODE_ENV}.env`],
      load: [emailConfig, typeOrmConfig, nodeEnvConfig],
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
      }),
    }),
  ],
  providers: [CoreService],
  exports: [CommonModule],
})
export class CoreModule {}
