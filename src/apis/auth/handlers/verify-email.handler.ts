import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { VerifyEmailCommand } from 'src/apis/auth/commands/verify-email.command';
import { AuthService } from 'src/apis/auth/services/auth.service';
import { UserStatus } from 'src/apis/users/constants/user-status.enum';
import { UsersService } from 'src/apis/users/services/users.service';

@Injectable()
@CommandHandler(VerifyEmailCommand)
export class VerifyEmailHandler implements ICommandHandler<VerifyEmailCommand> {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}
  async execute(command: VerifyEmailCommand): Promise<any> {
    const { signupVerifyToken } = command.verifyEmailDto;

    const existUser = await this.usersService.findOne({
      where: { signupVerifyToken, status: UserStatus.Inactive },
    });

    if (!existUser) {
      throw new NotFoundException('해당 유저가 존재하지 않습니다.');
    }

    await this.usersService.verifyUser(
      existUser.signupVerifyToken,
      existUser.id,
    );

    return {
      accessToken: this.authService.generateAccessToken({ id: existUser.id }),
      refreshToken: this.authService.generateRefreshToken({ id: existUser.id }),
    };
  }
}
