import { MigrationInterface, QueryRunner } from 'typeorm';

export class addColumnForUserProfile1631886495205
  implements MigrationInterface
{
  name = 'addColumnForUserProfile1631886495205';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_profiles\` DROP COLUMN \`sale_channel\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles\` DROP COLUMN \`sale_skill\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles\` ADD \`first_name\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles\` ADD \`last_name\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles\` ADD \`sale_channels\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles\` ADD \`sale_skills\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles\` ADD \`sale_tools\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_profiles\` DROP COLUMN \`sale_tools\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles\` DROP COLUMN \`sale_skills\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles\` DROP COLUMN \`sale_channels\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles\` DROP COLUMN \`last_name\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles\` DROP COLUMN \`first_name\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles\` ADD \`sale_skill\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles\` ADD \`sale_channel\` varchar(255) NULL`,
    );
  }
}
