import { MigrationInterface, QueryRunner } from 'typeorm';

export class userProfileIsverifiedDefaultAsFalse1630658536449
  implements MigrationInterface
{
  name = 'userProfileIsverifiedDefaultAsFalse1630658536449';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_profiles\` ADD \`is_verified\` tinyint NOT NULL DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`type\` \`type\` enum ('USER', 'HIRER', 'SYSTEM') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`is_active\` \`is_active\` tinyint NOT NULL DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`is_active\` \`is_active\` tinyint NOT NULL DEFAULT '1'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`type\` \`type\` enum ('USER', 'HIRER') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles\` DROP COLUMN \`is_verified\``,
    );
  }
}
