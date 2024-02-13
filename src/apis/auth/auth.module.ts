import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtModuleOptionsFactory } from './jwt/jwt-module-options.factory';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt/jwt-access-token.strategy';
import { JwtServiceFactory } from './jwt/jwt-service.factory';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      useClass: JwtModuleOptionsFactory,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtServiceFactory, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
