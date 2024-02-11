import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import * as uuid from 'uuid';
import { EmailService } from 'src/apis/email/services/email.service';
import { UserRepository } from '../repository/user.repository';
import { DataSource, FindOneOptions } from 'typeorm';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly emailService: EmailService,
    private readonly userRepository: UserRepository,
    private readonly dataSource: DataSource,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const isExistUser = await this.checkUserExists(email);

    if (isExistUser) {
      throw new ConflictException('An email that already exists.');
    }

    const signupVerifyToken = uuid.v1();

    await this.saveUser({ ...createUserDto }, signupVerifyToken);

    await this.sendMemberJoinEmail(email, signupVerifyToken);

    return;
  }

  async findOneUser(userId: number): Promise<UserDto> {
    /**
     * @todo
     * 1. userId를 가진 유저가 존재하는지 DB에서 확인하고 없다면 에러 처리
     * 2. 조회된 데이터를 UserInfo 타입으로 응답
     */
    const existUser = await this.userRepository.findOneBy({ id: userId });

    return existUser ? new UserDto(existUser) : null;
  }

  findOneBy(options: FindOneOptions) {
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
    signupVerifyToken: string,
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

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
