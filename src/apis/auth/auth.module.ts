import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtAccessTokenStrategy } from './jwt/jwt-access-token.strategy';
import { JwtServiceFactory } from './jwt/jwt-service.factory';
import { JwtRefreshTokenStrategy } from './jwt/jwt-refresh-token.strategy';

@Module({
  imports: [UsersModule, PassportModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtServiceFactory,
    JwtAccessTokenStrategy,
    JwtRefreshTokenStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
