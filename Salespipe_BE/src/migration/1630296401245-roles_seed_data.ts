import { MigrationInterface, QueryRunner } from 'typeorm';

export class rolesSeedData1630296401245 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO roles (id, code, name)
        VALUES
            ('90df268d-0947-11ec-9b25-0242ac140002', 'SDR', 'User role'),
            ('0378cee7-0948-11ec-9b25-0242ac140002', 'HIRER', 'Hirer role'),
            ('09fa1762-0948-11ec-9b25-0242ac140002', 'ADMIN', 'Administrator role')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM roles
			WHERE id IN('90df268d-0947-11ec-9b25-0242ac140002', '0378cee7-0948-11ec-9b25-0242ac140002', '09fa1762-0948-11ec-9b25-0242ac140002')`);
  }
}
