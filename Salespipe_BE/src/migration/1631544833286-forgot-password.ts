import { MigrationInterface, QueryRunner } from 'typeorm';

export class forgotPassword1631544833286 implements MigrationInterface {
  name = 'forgotPassword1631544833286';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`forgot_password_tokens\` (\`id\` char(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`version\` int NOT NULL, \`code\` char(36) NOT NULL, \`user_id\` char(36) NOT NULL, \`expiry_date\` datetime NOT NULL, UNIQUE INDEX \`IDX_c8d6146f83eb166924d139a993\` (\`code\`), UNIQUE INDEX \`REL_779e5ebc693d8490cdf072f189\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`forgot_password_tokens\` ADD CONSTRAINT \`FK_779e5ebc693d8490cdf072f189a\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`forgot_password_tokens\` DROP FOREIGN KEY \`FK_779e5ebc693d8490cdf072f189a\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_779e5ebc693d8490cdf072f189\` ON \`forgot_password_tokens\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_c8d6146f83eb166924d139a993\` ON \`forgot_password_tokens\``,
    );
    await queryRunner.query(`DROP TABLE \`forgot_password_tokens\``);
  }
}
