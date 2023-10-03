import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import * as uuid from 'uuid';
import { EmailService } from 'src/apis/email/services/email.service';
import { UserRepository } from '../repository/user.repository';
import { DataSource, FindOneOptions } from 'typeorm';
import { UserDto } from '../dto/user.dto';
import { UUID } from 'crypto';
import { UserStatus } from '../constants/user-status.enum';
import { User } from 'src/entities/User';

@Injectable()
export class UsersService {
  constructor(
    private readonly emailService: EmailService,
    private readonly userRepository: UserRepository,
    private readonly dataSource: DataSource,
  ) {}

  /**
   * 유저 생성
   */
  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const isExistUser = await this.checkUserExists(email);

    // if (isExistUser) {
    //   throw new ConflictException('An email that already exists.');
    // }

    const signupVerifyToken = uuid.v1();

    await this.saveUser({ ...createUserDto }, signupVerifyToken as UUID);

    await this.sendMemberJoinEmail(email, signupVerifyToken);

    return;
  }

  async findOneUserBy(myId: number, userId: number): Promise<UserDto> {
    const existUser = await this.userRepository.findOneBy({ id: userId });

    return existUser ? new UserDto(existUser) : null;
  }

  findOne(options: FindOneOptions<User>) {
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

  private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    await this.emailService.sendMemberJoinVerification(
      email,
      signupVerifyToken,
    );
  }

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
