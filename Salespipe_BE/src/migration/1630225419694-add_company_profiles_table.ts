import { MigrationInterface, QueryRunner } from 'typeorm';

export class addCompanyProfilesTable1630225419694
  implements MigrationInterface
{
  name = 'addCompanyProfilesTable1630225419694';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`company_profiles\` (\`id\` char(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`version\` int NOT NULL, \`user_id\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`linked_in\` varchar(255) NULL, \`avatar\` varchar(255) NULL, \`headline\` varchar(255) NOT NULL, \`description\` varchar(1023) NOT NULL, \`website\` varchar(255) NULL, \`userId\` char(36) NULL, UNIQUE INDEX \`REL_c00cddbc55d29f93f2ae510952\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_profiles\` ADD CONSTRAINT \`FK_c00cddbc55d29f93f2ae5109525\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`company_profiles\` DROP FOREIGN KEY \`FK_c00cddbc55d29f93f2ae5109525\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_c00cddbc55d29f93f2ae510952\` ON \`company_profiles\``,
    );
    await queryRunner.query(`DROP TABLE \`company_profiles\``);
  }
}
