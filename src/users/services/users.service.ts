import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import * as uuid from 'uuid';
import { EmailService } from 'src/email/email.service';
import { VerifyEmailDto } from '../dto/verify-email-dto';
import { UserLoginDto } from '../dto/user-login-dto';
import { UserInfo } from '../interface/user-info.interface';

@Injectable()
export class UsersService {
  constructor(private readonly emailService: EmailService) {}

  async create(createUserDto: CreateUserDto) {
    const { email, name, password } = createUserDto;
    await this.checkUserExists(email);

    const signupVerifyToken = uuid.v1();

    await this.saveUser(email, name, password, signupVerifyToken);
    await this.sendMemberJoinEmail(email, signupVerifyToken);

    return;
  }

  getUserInfo(userId: string): Promise<UserInfo> {
    /**
     * @todo
     * 1. userId를 가진 유저가 존재하는지 DB에서 확인하고 없다면 에러 처리
     * 2. 조회된 데이터를 UserInfo 타입으로 응답
     */

    throw new Error('Method not implemented');
  }

  verifyEmail(verifyEmailDto: VerifyEmailDto) {
    const { signupVerifyToken } = verifyEmailDto;

    /**
     * @todo
     * 1. DB에서 signupVerifyToken으로 회원 가입 처리중인 유저가 잇는지 조회하고 없다면 에러 처리
     * 2. 바로 로그인 상태가 되도록 JWT를 발급
     */

    throw new Error('Method not implemented');
  }

  login(userLoginDto: UserLoginDto) {
    const { email, password } = userLoginDto;
    /**
     * @todo
     *
     * 1. userId를 가진 유저가 존재하는지 DB에서 확인하고 없다면 에러 처리
     * 2. 조회된 데이터를 UserInfo 타입으로 응답
     */

    throw new Error('Method not implemented');
  }

  /**
   * @todo DB 연동 후 구현
   */
  private checkUserExists(email: string) {
    return false;
  }

  /**
   * @todo DB 연동 후 구현
   */
  private saveUser(
    email: string,
    name: string,
    password: string,
    signupVerifyToken: string,
  ) {
    return;
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
