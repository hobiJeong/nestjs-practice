import { Logger, Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { EmailModule } from 'src/apis/email/email.module';
import { TypeOrmExModule } from 'src/core/type-orm/type-orm-ex.module';
import { UserRepository } from './repository/user.repository';
import { LoggerModule } from 'src/middlewares/logger.module';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    EmailModule,
    TypeOrmExModule.forCustomRepository([UserRepository]),
    LoggerModule,
    CqrsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, Logger],
  exports: [UsersService],
})
export class UsersModule {}
