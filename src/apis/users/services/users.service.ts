import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from '../interface/dto/create-user.dto';
import { UpdateUserDto } from '../interface/dto/update-user.dto';
import * as uuid from 'uuid';
import { UserRepository } from '../infra/db/repository/user.repository';
import { DataSource, FindOneOptions, Repository } from 'typeorm';
import { UserDto } from '../interface/dto/user.dto';
import { UUID } from 'crypto';
import { UserStatus } from '../constants/user-status.enum';
import { UserEntity } from 'src/apis/users/infra/db/entities/User.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly dataSource: DataSource,
  ) {}

  /**
   * 유저 생성
   */
  // async create(createUserDto: CreateUserDto) {
  //   const { email } = createUserDto;

  //   const isExistUser = await this.checkUserExists(email);

  //   // if (isExistUser) {
  //   //   throw new ConflictException('An email that already exists.');
  //   // }

  //   const signupVerifyToken = uuid.v1();

  //   await this.saveUser({ ...createUserDto }, signupVerifyToken as UUID);

  //   await this.sendMemberJoinEmail(email, signupVerifyToken);

  //   return;
  // }

  async findOneUserBy(myId: number, userId: number): Promise<UserDto> {
    const existUser = await this.userRepository.findOneBy({ id: userId });

    return existUser ? new UserDto(existUser) : null;
  }

  findOne(options: FindOneOptions<UserEntity>) {
    return this.userRepository.findOne(options);
  }

  login() {}

  private checkUserExists(email: string) {
    return this.userRepository.exists({ where: { email } });
  }

  /**
   * @todo DB 연동 후 구현
   */
  private async saveUser(
    createUserDto: CreateUserDto,
    signupVerifyToken: UUID,
  ) {
    return this.userRepository.save({ ...createUserDto, signupVerifyToken });
  }

  // private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
  //   await this.emailService.sendMemberJoinVerification(
  //     email,
  //     signupVerifyToken,
  //   );
  // }

  findAll() {
    return `This action returns all users`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  verifyUser(signupVerifyToken: UUID, userId: number) {
    return this.userRepository.update(
      { id: userId, signupVerifyToken },
      { status: UserStatus.Active },
    );
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
