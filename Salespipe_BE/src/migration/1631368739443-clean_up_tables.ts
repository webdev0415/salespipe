import { MigrationInterface, QueryRunner } from 'typeorm';

export class cleanUpTables1631368739443 implements MigrationInterface {
  name = 'cleanUpTables1631368739443';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users_roles\` DROP FOREIGN KEY \`FK_deeb1fe94ce2d111a6695a2880e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles_languages\` DROP FOREIGN KEY \`FK_d88f08e9592aed3e96039b61b70\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles_industries\` DROP FOREIGN KEY \`FK_bcf3d9bc6593fa857efd0d90c51\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_d06e08f04b51637dffa0ff1685\` ON \`company_profiles\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_6ca9503d77ae39b4b5a6cc3ba8\` ON \`user_profiles\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_deeb1fe94ce2d111a6695a2880\` ON \`users_roles\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_d88f08e9592aed3e96039b61b7\` ON \`user_profiles_languages\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_bcf3d9bc6593fa857efd0d90c5\` ON \`user_profiles_industries\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_roles\` CHANGE \`usersId\` \`user_id\` char(36) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles_languages\` CHANGE \`userProfilesId\` \`user_profile_id\` char(36) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles_industries\` CHANGE \`userProfilesId\` \`user_profile_id\` char(36) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`roles\` ADD UNIQUE INDEX \`IDX_f6d54f95c31b73fb1bdd8e91d0\` (\`code\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`type\` \`type\` enum ('SDR', 'HIRER', 'SYSTEM') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract_term\` DROP FOREIGN KEY \`FK_aa3b764b0ee2b2873fce9189658\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract_term\` CHANGE \`contract_id\` \`contract_id\` char(36) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`countries\` ADD UNIQUE INDEX \`IDX_b47cbb5311bad9c9ae17b8c1ed\` (\`code\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`industries\` ADD UNIQUE INDEX \`IDX_afc1ff553ae4dfc3502ccb363d\` (\`code\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`languages\` ADD UNIQUE INDEX \`IDX_7397752718d1c9eb873722ec9b\` (\`code\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_e4435209df12bc1f001e536017\` ON \`users_roles\` (\`user_id\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_e7b1e35030340de736fcc60032\` ON \`user_profiles_languages\` (\`user_profile_id\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_61eddc0cd383babed5640dd5d7\` ON \`user_profiles_industries\` (\`user_profile_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract_term\` ADD CONSTRAINT \`FK_aa3b764b0ee2b2873fce9189658\` FOREIGN KEY (\`contract_id\`) REFERENCES \`contract\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_roles\` ADD CONSTRAINT \`FK_e4435209df12bc1f001e5360174\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles_languages\` ADD CONSTRAINT \`FK_e7b1e35030340de736fcc60032c\` FOREIGN KEY (\`user_profile_id\`) REFERENCES \`user_profiles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles_industries\` ADD CONSTRAINT \`FK_61eddc0cd383babed5640dd5d7b\` FOREIGN KEY (\`user_profile_id\`) REFERENCES \`user_profiles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_profiles_industries\` DROP FOREIGN KEY \`FK_61eddc0cd383babed5640dd5d7b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles_languages\` DROP FOREIGN KEY \`FK_e7b1e35030340de736fcc60032c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_roles\` DROP FOREIGN KEY \`FK_e4435209df12bc1f001e5360174\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract_term\` DROP FOREIGN KEY \`FK_aa3b764b0ee2b2873fce9189658\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_61eddc0cd383babed5640dd5d7\` ON \`user_profiles_industries\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_e7b1e35030340de736fcc60032\` ON \`user_profiles_languages\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_e4435209df12bc1f001e536017\` ON \`users_roles\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`languages\` DROP INDEX \`IDX_7397752718d1c9eb873722ec9b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`industries\` DROP INDEX \`IDX_afc1ff553ae4dfc3502ccb363d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`countries\` DROP INDEX \`IDX_b47cbb5311bad9c9ae17b8c1ed\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract_term\` CHANGE \`contract_id\` \`contract_id\` char(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract_term\` ADD CONSTRAINT \`FK_aa3b764b0ee2b2873fce9189658\` FOREIGN KEY (\`contract_id\`) REFERENCES \`contract\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`type\` \`type\` enum ('USER', 'HIRER', 'SYSTEM') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`roles\` DROP INDEX \`IDX_f6d54f95c31b73fb1bdd8e91d0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles_industries\` CHANGE \`user_profile_id\` \`userProfilesId\` char(36) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles_languages\` CHANGE \`user_profile_id\` \`userProfilesId\` char(36) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_roles\` CHANGE \`user_id\` \`usersId\` char(36) NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_bcf3d9bc6593fa857efd0d90c5\` ON \`user_profiles_industries\` (\`userProfilesId\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_d88f08e9592aed3e96039b61b7\` ON \`user_profiles_languages\` (\`userProfilesId\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_deeb1fe94ce2d111a6695a2880\` ON \`users_roles\` (\`usersId\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_6ca9503d77ae39b4b5a6cc3ba8\` ON \`user_profiles\` (\`user_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_d06e08f04b51637dffa0ff1685\` ON \`company_profiles\` (\`user_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles_industries\` ADD CONSTRAINT \`FK_bcf3d9bc6593fa857efd0d90c51\` FOREIGN KEY (\`userProfilesId\`) REFERENCES \`user_profiles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles_languages\` ADD CONSTRAINT \`FK_d88f08e9592aed3e96039b61b70\` FOREIGN KEY (\`userProfilesId\`) REFERENCES \`user_profiles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_roles\` ADD CONSTRAINT \`FK_deeb1fe94ce2d111a6695a2880e\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
