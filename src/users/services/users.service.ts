import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import * as uuid from 'uuid';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class UsersService {
  constructor(private readonly emailService: EmailService) {}

  async create(createUserDto: CreateUserDto) {
    const { email, name, password } = createUserDto;
    await this.checkUserExists(email);

    const signupVerifyToken = uuid.v1();

    await this.saveUser(email, name, password, signupVerifyToken);
    await this.sendMemberJoinEmail;
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

  private sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    await this.emailService.sendMemberJoinEmail(email, signupVerifyToken);
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
