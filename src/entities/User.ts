import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('UQ_e12875dfb3b1d92d7d7c5377e22', ['email'], { unique: true })
@Entity('user', { schema: 'nestjs_practice_db' })
export class User {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '유저 고유 ID',
    unsigned: true,
  })
  id: number;

  @Column('varchar', { name: 'name', comment: '유저 이름', length: 30 })
  name: string;

  @Column('varchar', {
    name: 'email',
    unique: true,
    comment: '유저 이메일',
    length: 60,
  })
  email: string;

  @Column('varchar', { name: 'password', comment: '유저 패스워드', length: 30 })
  password: string;

  @Column('varchar', {
    name: 'signup_verify_token',
    comment: '유저 회원가입 인증 토큰',
    length: 60,
  })
  signupVerifyToken: string;

  @Column('timestamp', {
    name: 'created_at',
    comment: '생성 일자',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp', {
    name: 'updated_at',
    comment: '수정 일자',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column('timestamp', {
    name: 'deleted_at',
    nullable: true,
    comment: '삭제 일자',
  })
  deletedAt: Date | null;
}
