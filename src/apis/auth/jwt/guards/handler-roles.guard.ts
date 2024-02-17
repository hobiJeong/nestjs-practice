import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from 'src/apis/users/constants/user-role.enum';
import { UsersService } from 'src/apis/users/services/users.service';

export class HandlerRolesGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private readonly usersService: UsersService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { role } = await this.usersService.findOne({
      where: { id: request.user.id },
    });

    return role === this.checkRole(context);
  }

  private checkRole(context: ExecutionContext) {
    return this.reflector.get<UserRole>(UserRole.Admin, context.getHandler());
  }
}
