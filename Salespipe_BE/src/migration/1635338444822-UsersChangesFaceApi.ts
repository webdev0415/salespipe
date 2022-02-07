import { MigrationInterface, QueryRunner } from 'typeorm';

export class UsersChangesFaceApi1635338444822 implements MigrationInterface {
  name = 'UsersChangesFaceApi1635338444822';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_profiles\` ADD \`age\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles\` ADD \`gender\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles\` ADD \`expression\` varchar(255) NULL`,
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
      `ALTER TABLE \`user_profiles\` DROP COLUMN \`expression\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles\` DROP COLUMN \`gender\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles\` DROP COLUMN \`age\``,
    );
  }
}
