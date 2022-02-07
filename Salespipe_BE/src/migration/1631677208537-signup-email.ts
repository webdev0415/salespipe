import { MigrationInterface, QueryRunner } from 'typeorm';

export class signupEmail1631677208537 implements MigrationInterface {
  name = 'signupEmail1631677208537';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`signup_prepare_tokens\` (\`id\` char(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`version\` int NOT NULL, \`code\` char(36) NOT NULL, \`email\` varchar(255) NOT NULL, \`expiry_date\` datetime NOT NULL, UNIQUE INDEX \`IDX_e01d2c3d9452c9b05fd3970045\` (\`code\`), UNIQUE INDEX \`IDX_5ffdaf32a6b848798bfc4301e3\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_5ffdaf32a6b848798bfc4301e3\` ON \`signup_prepare_tokens\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_e01d2c3d9452c9b05fd3970045\` ON \`signup_prepare_tokens\``,
    );
    await queryRunner.query(`DROP TABLE \`signup_prepare_tokens\``);
  }
}
