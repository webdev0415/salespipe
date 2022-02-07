import { MigrationInterface, QueryRunner } from 'typeorm';

export class addColumnForCompanyProfile1631884199675
  implements MigrationInterface
{
  name = 'addColumnForCompanyProfile1631884199675';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`company_profiles\` ADD \`company\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_profiles\` ADD \`first_name\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_profiles\` ADD \`last_name\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_profiles\` ADD \`title\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_profiles\` ADD \`phone\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_profiles\` ADD \`position\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_profiles\` ADD \`time\` enum ('FULLTIME', 'PARTTIME', 'BOTH') NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_profiles\` ADD \`head_count\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_profiles\` ADD \`sale_tools\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_profiles\` ADD \`target_customer\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_profiles\` ADD \`team_size\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_profiles\` CHANGE \`headline\` \`headline\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_profiles\` CHANGE \`description\` \`description\` varchar(1023) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`company_profiles\` CHANGE \`description\` \`description\` varchar(1023) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_profiles\` CHANGE \`headline\` \`headline\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_profiles\` DROP COLUMN \`team_size\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_profiles\` DROP COLUMN \`target_customer\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_profiles\` DROP COLUMN \`sale_tools\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_profiles\` DROP COLUMN \`head_count\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_profiles\` DROP COLUMN \`time\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_profiles\` DROP COLUMN \`position\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_profiles\` DROP COLUMN \`phone\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_profiles\` DROP COLUMN \`title\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_profiles\` DROP COLUMN \`last_name\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_profiles\` DROP COLUMN \`first_name\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_profiles\` DROP COLUMN \`company\``,
    );
  }
}
