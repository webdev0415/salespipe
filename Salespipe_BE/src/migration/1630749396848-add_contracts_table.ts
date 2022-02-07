import { MigrationInterface, QueryRunner } from 'typeorm';

export class addContractsTable1630749396848 implements MigrationInterface {
  name = 'addContractsTable1630749396848';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`contract\` (\`id\` char(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`version\` int NOT NULL, \`status\` enum ('DRAFT', 'FINAL', 'EFFECTING', 'ENDED') NOT NULL, \`startDate\` datetime NOT NULL, \`endDate\` datetime NOT NULL, \`hirerId\` char(36) NULL, \`hireeId\` char(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`contract_term\` (\`id\` char(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`version\` int NOT NULL, \`status\` enum ('DRAFT', 'FINAL', 'EFFECTING', 'ENDED') NOT NULL, \`rate\` int NOT NULL, \`hoursPerWeek\` int NOT NULL, \`startDate\` datetime NOT NULL, \`endDate\` datetime NOT NULL, \`contractId\` char(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract\` ADD CONSTRAINT \`FK_6c58f9cfcff907d6e6f356a2f4c\` FOREIGN KEY (\`hirerId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract\` ADD CONSTRAINT \`FK_f2028997dd920ec7d9bb2f75783\` FOREIGN KEY (\`hireeId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract_term\` ADD CONSTRAINT \`FK_d018cb69d0fb60d46e6270d4207\` FOREIGN KEY (\`contractId\`) REFERENCES \`contract\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`contract_term\` DROP FOREIGN KEY \`FK_d018cb69d0fb60d46e6270d4207\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract\` DROP FOREIGN KEY \`FK_f2028997dd920ec7d9bb2f75783\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`contract\` DROP FOREIGN KEY \`FK_6c58f9cfcff907d6e6f356a2f4c\``,
    );
    await queryRunner.query(`DROP TABLE \`contract_term\``);
    await queryRunner.query(`DROP TABLE \`contract\``);
  }
}
