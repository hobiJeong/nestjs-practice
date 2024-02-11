import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { EmailModule } from 'src/apis/email/email.module';
import { TypeOrmExModule } from 'src/core/type-orm/type-orm-ex.module';
import { UserRepository } from './repository/user.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    EmailModule,
    TypeOrmExModule.forCustomRepository([UserRepository]),
    AuthModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
