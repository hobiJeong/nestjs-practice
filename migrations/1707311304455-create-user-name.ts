import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import {
  generateCreatedAtColumn,
  generateDeletedAtColumn,
  generatePrimaryColumn,
  generateUpdatedAtColumn,
} from './__utils/util';

export class CreateUserName1707311304455 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          generatePrimaryColumn('유저 고유 ID'),
          {
            name: 'name',
            type: 'varchar',
            length: '30',
            isNullable: false,
            comment: '유저 이름',
          },
          {
            name: 'email',
            type: 'varchar',
            length: '60',
            isNullable: false,
            isUnique: true,
            comment: '유저 이메일',
          },
          {
            name: 'password',
            length: '30',
            type: 'varchar',
            isNullable: false,
            comment: '유저 패스워드',
          },
          {
            name: 'signup_verify_token',
            type: 'varchar',
            length: '60',
            isNullable: false,
            comment: '유저 회원가입 인증 토큰',
          },
          generateCreatedAtColumn('생성 일자'),
          generateUpdatedAtColumn('수정 일자'),
          generateDeletedAtColumn('삭제 일자'),
        ],
      }),
    );

    await queryRunner.query('ALTER TABLE user COMMENT = "유저"');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
