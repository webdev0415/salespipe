import { MigrationInterface, QueryRunner } from 'typeorm';

export class cleanUpTablesSecond1631368850893 implements MigrationInterface {
  name = 'cleanUpTablesSecond1631368850893';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users_roles\` DROP FOREIGN KEY \`FK_21db462422f1f97519a29041da0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles_languages\` DROP FOREIGN KEY \`FK_a88d4365dc7841de0ba6fead763\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles_industries\` DROP FOREIGN KEY \`FK_6c0febd49f7d20450fce923a3d8\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_21db462422f1f97519a29041da\` ON \`users_roles\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_a88d4365dc7841de0ba6fead76\` ON \`user_profiles_languages\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_6c0febd49f7d20450fce923a3d\` ON \`user_profiles_industries\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_roles\` CHANGE \`rolesId\` \`role_id\` char(36) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles_languages\` CHANGE \`languagesId\` \`language_id\` char(36) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles_industries\` CHANGE \`industriesId\` \`industry_id\` char(36) NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_1cf664021f00b9cc1ff95e17de\` ON \`users_roles\` (\`role_id\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_d9498bcaa364971e7433763f66\` ON \`user_profiles_languages\` (\`language_id\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_f809bbc0b72a12966f246a15bf\` ON \`user_profiles_industries\` (\`industry_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_roles\` ADD CONSTRAINT \`FK_1cf664021f00b9cc1ff95e17de4\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles_languages\` ADD CONSTRAINT \`FK_d9498bcaa364971e7433763f666\` FOREIGN KEY (\`language_id\`) REFERENCES \`languages\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles_industries\` ADD CONSTRAINT \`FK_f809bbc0b72a12966f246a15bf0\` FOREIGN KEY (\`industry_id\`) REFERENCES \`industries\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_profiles_industries\` DROP FOREIGN KEY \`FK_f809bbc0b72a12966f246a15bf0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles_languages\` DROP FOREIGN KEY \`FK_d9498bcaa364971e7433763f666\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_roles\` DROP FOREIGN KEY \`FK_1cf664021f00b9cc1ff95e17de4\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_f809bbc0b72a12966f246a15bf\` ON \`user_profiles_industries\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_d9498bcaa364971e7433763f66\` ON \`user_profiles_languages\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_1cf664021f00b9cc1ff95e17de\` ON \`users_roles\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles_industries\` CHANGE \`industry_id\` \`industriesId\` char(36) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles_languages\` CHANGE \`language_id\` \`languagesId\` char(36) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_roles\` CHANGE \`role_id\` \`rolesId\` char(36) NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_6c0febd49f7d20450fce923a3d\` ON \`user_profiles_industries\` (\`industriesId\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_a88d4365dc7841de0ba6fead76\` ON \`user_profiles_languages\` (\`languagesId\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_21db462422f1f97519a29041da\` ON \`users_roles\` (\`rolesId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles_industries\` ADD CONSTRAINT \`FK_6c0febd49f7d20450fce923a3d8\` FOREIGN KEY (\`industriesId\`) REFERENCES \`industries\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles_languages\` ADD CONSTRAINT \`FK_a88d4365dc7841de0ba6fead763\` FOREIGN KEY (\`languagesId\`) REFERENCES \`languages\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_roles\` ADD CONSTRAINT \`FK_21db462422f1f97519a29041da0\` FOREIGN KEY (\`rolesId\`) REFERENCES \`roles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
