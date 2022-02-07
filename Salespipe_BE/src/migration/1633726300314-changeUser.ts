import { MigrationInterface, QueryRunner } from 'typeorm';

export class changeUser1633726300314 implements MigrationInterface {
  name = 'changeUser1633726300314';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_64f3a85797b87fac96b5535581\` ON \`forgot_password_tokens\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_19e2289a21c7ad4b3981e5dca9\` ON \`signup_tokens\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_c00cddbc55d29f93f2ae510952\` ON \`company_profiles\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_8481388d6325e752cd4d7e26c6\` ON \`user_profiles\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles\` ADD \`video\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles\` DROP COLUMN \`yose\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles\` ADD \`yose\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles\` ADD CONSTRAINT \`FK_8481388d6325e752cd4d7e26c6d\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_profiles\` DROP FOREIGN KEY \`FK_8481388d6325e752cd4d7e26c6d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles\` DROP COLUMN \`yose\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles\` ADD \`yose\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles\` DROP COLUMN \`video\``,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_8481388d6325e752cd4d7e26c6\` ON \`user_profiles\` (\`userId\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_c00cddbc55d29f93f2ae510952\` ON \`company_profiles\` (\`userId\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_19e2289a21c7ad4b3981e5dca9\` ON \`signup_tokens\` (\`userId\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_64f3a85797b87fac96b5535581\` ON \`forgot_password_tokens\` (\`userId\`)`,
    );
  }
}
