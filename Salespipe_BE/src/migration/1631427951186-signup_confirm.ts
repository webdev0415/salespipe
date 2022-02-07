import { MigrationInterface, QueryRunner } from 'typeorm';

export class signupConfirm1631427951186 implements MigrationInterface {
  name = 'signupConfirm1631427951186';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`signup_tokens\` (\`id\` char(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`version\` int NOT NULL, \`code\` char(36) NOT NULL, \`expiry_date\` datetime NOT NULL, \`user_id\` char(36) NULL, UNIQUE INDEX \`IDX_1b5394c0f3e210d2f45ad04279\` (\`code\`), UNIQUE INDEX \`REL_ae6587d36d5c25d1d3867803c4\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`signup_tokens\` ADD CONSTRAINT \`FK_ae6587d36d5c25d1d3867803c4b\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`signup_tokens\` DROP FOREIGN KEY \`FK_ae6587d36d5c25d1d3867803c4b\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_ae6587d36d5c25d1d3867803c4\` ON \`signup_tokens\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_1b5394c0f3e210d2f45ad04279\` ON \`signup_tokens\``,
    );
    await queryRunner.query(`DROP TABLE \`signup_tokens\``);
  }
}
