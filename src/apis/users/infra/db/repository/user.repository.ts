import { CustomRepository } from 'src/core/type-orm/decorators/custom-repository.decorator';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { IUserRepository } from 'src/apis/users/domain/repository/iuser.repository';
import { User } from 'src/apis/users/domain/user';
import { UserEntity } from 'src/apis/users/infra/db/entities/User.entity';
import { UserFactory } from 'src/apis/users/domain/user.factory';
import { UUID } from 'crypto';
import { UserStatus } from 'src/apis/users/constants/user-status.enum';
import { UserRole } from 'src/apis/users/constants/user-role.enum';
import { UserDto } from 'src/apis/users/interface/dto/user.dto';
import { InternalServerErrorException } from '@nestjs/common';

@CustomRepository(UserEntity)
export class UserRepository
  extends Repository<UserEntity>
  implements IUserRepository
{
  async findByEmail(email: string): Promise<User | null> {
    const userEntity = await this.findOneBy({ email });

    console.log(userEntity, '유저찾기1', email);

    if (!userEntity) {
      return null;
    }

    const { id, name, password, signupVerifyToken, status, role } = userEntity;

    console.log(userEntity, '유저찾기');

    return new User(
      id,
      name,
      userEntity.email,
      password,
      signupVerifyToken,
      status,
      role,
    );
  }

  async saveUser(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: UUID,
    status: UserStatus,
    role: UserRole,
  ): Promise<User> {
    const userEntity = await this.manager.transaction(async (manager) => {
      const userEntity = this.create({
        name,
        email,
        password,
        signupVerifyToken,
        status,
        role,
      });

      return manager.withRepository(this).save(userEntity);
    });

    return new User(
      userEntity.id,
      name,
      email,
      password,
      signupVerifyToken,
      status,
      role,
    );
  }
}
