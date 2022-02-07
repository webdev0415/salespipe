import { MigrationInterface, QueryRunner } from 'typeorm';

export class addUsersUserProfilesCountriesLanguagesIndustriesTables1630225060069
  implements MigrationInterface
{
  name = 'addUsersUserProfilesCountriesLanguagesIndustriesTables1630225060069';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`countries\` (\`id\` char(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`version\` int NOT NULL, \`code\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`industries\` (\`id\` char(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`version\` int NOT NULL, \`code\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`languages\` (\`id\` char(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`version\` int NOT NULL, \`code\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` char(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`version\` int NOT NULL, \`type\` enum ('USER', 'HIRER') NOT NULL, \`username\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user_profiles\` (\`id\` char(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`version\` int NOT NULL, \`user_id\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`linked_in\` varchar(255) NULL, \`rate\` varchar(255) NOT NULL, \`hours_per_week\` int NOT NULL, \`avatar\` varchar(255) NULL, \`headline\` varchar(255) NOT NULL, \`bio\` varchar(1023) NOT NULL, \`country_id\` char(36) NOT NULL, \`yose\` int NOT NULL, \`sale_channel\` varchar(255) NULL, \`sale_skill\` varchar(255) NULL, \`work_history\` varchar(1023) NULL, \`userId\` char(36) NULL, UNIQUE INDEX \`REL_8481388d6325e752cd4d7e26c6\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user_profiles_languages\` (\`userProfilesId\` char(36) NOT NULL, \`languagesId\` char(36) NOT NULL, INDEX \`IDX_d88f08e9592aed3e96039b61b7\` (\`userProfilesId\`), INDEX \`IDX_a88d4365dc7841de0ba6fead76\` (\`languagesId\`), PRIMARY KEY (\`userProfilesId\`, \`languagesId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user_profiles_industries\` (\`userProfilesId\` char(36) NOT NULL, \`industriesId\` char(36) NOT NULL, INDEX \`IDX_bcf3d9bc6593fa857efd0d90c5\` (\`userProfilesId\`), INDEX \`IDX_6c0febd49f7d20450fce923a3d\` (\`industriesId\`), PRIMARY KEY (\`userProfilesId\`, \`industriesId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles\` ADD CONSTRAINT \`FK_8481388d6325e752cd4d7e26c6d\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles\` ADD CONSTRAINT \`FK_08cebbf6264e68ce171deaf3e97\` FOREIGN KEY (\`country_id\`) REFERENCES \`countries\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles_languages\` ADD CONSTRAINT \`FK_d88f08e9592aed3e96039b61b70\` FOREIGN KEY (\`userProfilesId\`) REFERENCES \`user_profiles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles_languages\` ADD CONSTRAINT \`FK_a88d4365dc7841de0ba6fead763\` FOREIGN KEY (\`languagesId\`) REFERENCES \`languages\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles_industries\` ADD CONSTRAINT \`FK_bcf3d9bc6593fa857efd0d90c51\` FOREIGN KEY (\`userProfilesId\`) REFERENCES \`user_profiles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles_industries\` ADD CONSTRAINT \`FK_6c0febd49f7d20450fce923a3d8\` FOREIGN KEY (\`industriesId\`) REFERENCES \`industries\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_profiles_industries\` DROP FOREIGN KEY \`FK_6c0febd49f7d20450fce923a3d8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles_industries\` DROP FOREIGN KEY \`FK_bcf3d9bc6593fa857efd0d90c51\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles_languages\` DROP FOREIGN KEY \`FK_a88d4365dc7841de0ba6fead763\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles_languages\` DROP FOREIGN KEY \`FK_d88f08e9592aed3e96039b61b70\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles\` DROP FOREIGN KEY \`FK_08cebbf6264e68ce171deaf3e97\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles\` DROP FOREIGN KEY \`FK_8481388d6325e752cd4d7e26c6d\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_6c0febd49f7d20450fce923a3d\` ON \`user_profiles_industries\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_bcf3d9bc6593fa857efd0d90c5\` ON \`user_profiles_industries\``,
    );
    await queryRunner.query(`DROP TABLE \`user_profiles_industries\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_a88d4365dc7841de0ba6fead76\` ON \`user_profiles_languages\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_d88f08e9592aed3e96039b61b7\` ON \`user_profiles_languages\``,
    );
    await queryRunner.query(`DROP TABLE \`user_profiles_languages\``);
    await queryRunner.query(
      `DROP INDEX \`REL_08cebbf6264e68ce171deaf3e9\` ON \`user_profiles\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_8481388d6325e752cd4d7e26c6\` ON \`user_profiles\``,
    );
    await queryRunner.query(`DROP TABLE \`user_profiles\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``,
    );
    await queryRunner.query(`DROP TABLE \`users\``);
    await queryRunner.query(`DROP TABLE \`languages\``);
    await queryRunner.query(`DROP TABLE \`industries\``);
    await queryRunner.query(`DROP TABLE \`countries\``);
  }
}
