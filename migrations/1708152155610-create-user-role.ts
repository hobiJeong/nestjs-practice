import { UserRole } from 'src/apis/users/constants/user-role.enum';
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class CreateUserRole1708152155610 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'role',
        type: 'enum',
        enum: [UserRole.Admin, UserRole.User],
        default: `'${UserRole.User}'`,
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'role');
  }
}
