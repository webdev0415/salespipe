import { MigrationInterface, QueryRunner } from 'typeorm';

export class userAccountInactiveAsDefault1630655659393
  implements MigrationInterface
{
  name = 'userAccountInactiveAsDefault1630655659393';

  public async up(queryRunner: QueryRunner): Promise<void> {
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
  }
}
