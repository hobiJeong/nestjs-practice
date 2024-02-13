import { UserStatus } from 'src/apis/users/constants/user-status.enum';
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class CreateStatusUserTable1707842547012 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'status',
        type: 'enum',
        enum: [UserStatus.Active, UserStatus.Inactive, UserStatus.Delete],
        default: UserStatus.Inactive,
        isNullable: false,
        comment: '유저 상태',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'status');
  }
}
