import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { EmailModule } from 'src/api/email/email.module';
import { TypeOrmExModule } from 'src/core/type-orm/type-orm-ex.module';
import { User } from 'src/entities/User';

@Module({
  imports: [EmailModule, TypeOrmExModule.forCustomRepository([User])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
