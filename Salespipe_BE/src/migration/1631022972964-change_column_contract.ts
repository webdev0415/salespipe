import { MigrationInterface, QueryRunner } from 'typeorm';

export class changeColumnContract1631022972964 implements MigrationInterface {
  name = 'changeColumnContract1631022972964';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`company_profiles\` DROP FOREIGN KEY \`FK_c00cddbc55d29f93f2ae5109525\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract\` DROP FOREIGN KEY \`FK_6c58f9cfcff907d6e6f356a2f4c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract\` DROP FOREIGN KEY \`FK_f2028997dd920ec7d9bb2f75783\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract_term\` DROP FOREIGN KEY \`FK_d018cb69d0fb60d46e6270d4207\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles\` DROP FOREIGN KEY \`FK_8481388d6325e752cd4d7e26c6d\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_c00cddbc55d29f93f2ae510952\` ON \`company_profiles\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_8481388d6325e752cd4d7e26c6\` ON \`user_profiles\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_profiles\` DROP COLUMN \`userId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract\` DROP COLUMN \`startDate\``,
    );
    await queryRunner.query(`ALTER TABLE \`contract\` DROP COLUMN \`endDate\``);
    await queryRunner.query(`ALTER TABLE \`contract\` DROP COLUMN \`hirerId\``);
    await queryRunner.query(`ALTER TABLE \`contract\` DROP COLUMN \`hireeId\``);
    await queryRunner.query(
      `ALTER TABLE \`contract_term\` DROP COLUMN \`hoursPerWeek\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract_term\` DROP COLUMN \`startDate\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract_term\` DROP COLUMN \`endDate\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract_term\` DROP COLUMN \`contractId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles\` DROP COLUMN \`userId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract\` ADD \`hirer_id\` char(36) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract\` ADD \`hiree_id\` char(36) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract\` ADD \`start_date\` datetime NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract\` ADD \`end_date\` datetime NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract_term\` ADD \`hours_per_week\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract_term\` ADD \`start_date\` datetime NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract_term\` ADD \`end_date\` datetime NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract_term\` ADD \`contract_id\` char(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_profiles\` DROP COLUMN \`user_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_profiles\` ADD \`user_id\` char(36) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_profiles\` ADD UNIQUE INDEX \`IDX_d06e08f04b51637dffa0ff1685\` (\`user_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles\` DROP COLUMN \`user_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles\` ADD \`user_id\` char(36) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles\` ADD UNIQUE INDEX \`IDX_6ca9503d77ae39b4b5a6cc3ba8\` (\`user_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_d06e08f04b51637dffa0ff1685\` ON \`company_profiles\` (\`user_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_6ca9503d77ae39b4b5a6cc3ba8\` ON \`user_profiles\` (\`user_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_profiles\` ADD CONSTRAINT \`FK_d06e08f04b51637dffa0ff16850\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract\` ADD CONSTRAINT \`FK_1e2dadafc57dc7b1f5f47c6ed1b\` FOREIGN KEY (\`hirer_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract\` ADD CONSTRAINT \`FK_a076e9d14d83c6e4f0fa249fb88\` FOREIGN KEY (\`hiree_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract_term\` ADD CONSTRAINT \`FK_aa3b764b0ee2b2873fce9189658\` FOREIGN KEY (\`contract_id\`) REFERENCES \`contract\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles\` ADD CONSTRAINT \`FK_6ca9503d77ae39b4b5a6cc3ba88\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_profiles\` DROP FOREIGN KEY \`FK_6ca9503d77ae39b4b5a6cc3ba88\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract_term\` DROP FOREIGN KEY \`FK_aa3b764b0ee2b2873fce9189658\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract\` DROP FOREIGN KEY \`FK_a076e9d14d83c6e4f0fa249fb88\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract\` DROP FOREIGN KEY \`FK_1e2dadafc57dc7b1f5f47c6ed1b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_profiles\` DROP FOREIGN KEY \`FK_d06e08f04b51637dffa0ff16850\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_6ca9503d77ae39b4b5a6cc3ba8\` ON \`user_profiles\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_d06e08f04b51637dffa0ff1685\` ON \`company_profiles\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles\` DROP INDEX \`IDX_6ca9503d77ae39b4b5a6cc3ba8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles\` DROP COLUMN \`user_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles\` ADD \`user_id\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_profiles\` DROP INDEX \`IDX_d06e08f04b51637dffa0ff1685\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_profiles\` DROP COLUMN \`user_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_profiles\` ADD \`user_id\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract_term\` DROP COLUMN \`contract_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract_term\` DROP COLUMN \`end_date\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract_term\` DROP COLUMN \`start_date\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract_term\` DROP COLUMN \`hours_per_week\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract\` DROP COLUMN \`end_date\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract\` DROP COLUMN \`start_date\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract\` DROP COLUMN \`hiree_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract\` DROP COLUMN \`hirer_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles\` ADD \`userId\` char(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract_term\` ADD \`contractId\` char(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract_term\` ADD \`endDate\` datetime NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract_term\` ADD \`startDate\` datetime NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract_term\` ADD \`hoursPerWeek\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract\` ADD \`hireeId\` char(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract\` ADD \`hirerId\` char(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract\` ADD \`endDate\` datetime NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract\` ADD \`startDate\` datetime NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_profiles\` ADD \`userId\` char(36) NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_8481388d6325e752cd4d7e26c6\` ON \`user_profiles\` (\`userId\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_c00cddbc55d29f93f2ae510952\` ON \`company_profiles\` (\`userId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profiles\` ADD CONSTRAINT \`FK_8481388d6325e752cd4d7e26c6d\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract_term\` ADD CONSTRAINT \`FK_d018cb69d0fb60d46e6270d4207\` FOREIGN KEY (\`contractId\`) REFERENCES \`contract\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract\` ADD CONSTRAINT \`FK_f2028997dd920ec7d9bb2f75783\` FOREIGN KEY (\`hireeId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract\` ADD CONSTRAINT \`FK_6c58f9cfcff907d6e6f356a2f4c\` FOREIGN KEY (\`hirerId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`company_profiles\` ADD CONSTRAINT \`FK_c00cddbc55d29f93f2ae5109525\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
