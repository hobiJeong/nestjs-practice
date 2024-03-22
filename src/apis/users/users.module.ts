import { Logger, Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { EmailModule } from 'src/apis/email/email.module';
import { TypeOrmExModule } from 'src/core/type-orm/type-orm-ex.module';
import { UserRepository } from './infra/db/repository/user.repository';
import { LoggerModule } from 'src/middlewares/logger.module';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from 'src/apis/users/applications/commands/create-user.handler';
import { UserEventsHandler } from 'src/apis/users/applications/events/user-events.handler';
import { GetUserQueryHandler } from 'src/apis/users/applications/queries/get-user-query.handler';
import { UserFactory } from 'src/apis/users/domain/user.factory';
import { EXTERNAL_EMAIL_SERVICE_TOKEN } from 'src/apis/email/constants/external-email-service.token';
import { ExternalEmailService } from 'src/apis/email/services/external-email.service';
import { EmailService } from 'src/apis/users/infra/adapter/email.service';

@Module({
  imports: [
    EmailModule,
    TypeOrmExModule.forCustomRepository([UserRepository]),
    LoggerModule,
    CqrsModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    Logger,
    CreateUserHandler,
    UserEventsHandler,
    GetUserQueryHandler,
    UserFactory,
    EmailService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
