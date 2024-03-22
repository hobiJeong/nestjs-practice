import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserDto } from 'src/apis/users/interface/dto/user.dto';
import { GetUserQuery } from 'src/apis/users/applications/queries/get-user.query';
import { UserRepository } from 'src/apis/users/infra/db/repository/user.repository';

@QueryHandler(GetUserQuery)
export class GetUserQueryHandler implements IQueryHandler<GetUserQuery> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: GetUserQuery): Promise<UserDto> {
    const { userId } = query;

    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException('유저 못찾음 by query handler');
    }

    return new UserDto(user);
  }
}
