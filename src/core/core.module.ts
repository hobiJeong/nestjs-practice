import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { CommonModule } from 'src/common/common.module';
import { ConfigModule } from '@nestjs/config';
import emailConfig from 'src/config/email.config';
import * as Joi from 'joi';

@Module({
  imports: [
    CommonModule,
    ConfigModule.forRoot({
      envFilePath: [`.${process.env.NODE_ENV}.env`],
      load: [emailConfig],
      isGlobal: true,
      validationSchema: Joi.object({
        EMAIL_SERVICE: Joi.string().required(),
        EMAIL_AUTH_USER: Joi.string().required(),
        EMAIL_AUTH_PASSWORD: Joi.string().required(),
        EMAIL_BASE_URL: Joi.string().required(),
      }),
    }),
  ],
  providers: [CoreService],
  exports: [CommonModule],
})
export class CoreModule {}
