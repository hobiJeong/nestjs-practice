import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtAccessTokenStrategy } from './jwt/strategies/jwt-access-token.strategy';
import { JwtRefreshTokenStrategy } from './jwt/strategies/jwt-refresh-token.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtModuleOptionsFactory } from './jwt/jwt-module-options.factory';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      useClass: JwtModuleOptionsFactory,
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtAccessTokenStrategy,
    JwtRefreshTokenStrategy,
    JwtModuleOptionsFactory,
  ],
  exports: [AuthService],
})
export class AuthModule {}
