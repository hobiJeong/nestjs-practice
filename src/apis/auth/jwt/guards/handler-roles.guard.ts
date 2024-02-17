import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from 'src/apis/users/constants/user-role.enum';
import { UsersService } from 'src/apis/users/services/users.service';
import { Payload } from '../../types/auth.type';
import { USER_ROLE_TOKEN } from 'src/apis/users/constants/user-role.token';

@Injectable()
export class HandlerRolesGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private readonly usersService: UsersService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    console.log(1);

    const { role } = await this.usersService.findOne({
      where: { id: request.user.id },
    });

    const active = await super.canActivate(context);

    return role === this.checkRole(context);
  }

  private checkRole(context: ExecutionContext) {
    return this.reflector.get<UserRole>(USER_ROLE_TOKEN, context.getHandler());
  }
}
