import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtModuleOptionsFactory } from './jwt/jwt-module-options.factory';

@Module({
  imports: [
    JwtModule.registerAsync({
      useClass: JwtModuleOptionsFactory,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtModuleOptionsFactory],
  exports: [AuthService],
})
export class AuthModule {}
