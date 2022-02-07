import { MigrationInterface, QueryRunner } from 'typeorm';

export class addAvaiabilityToUserProfiles1630672180246
  implements MigrationInterface
{
  name = 'addAvaiabilityToUserProfiles1630672180246';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_profiles\` ADD \`is_available\` tinyint NOT NULL DEFAULT 1`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_profiles\` DROP COLUMN \`is_available\``,
    );
  }
}
