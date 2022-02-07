import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as fs from 'fs';
import * as Path from 'path';
import { Connection, ConnectionManager } from 'typeorm';

const ignoreEntities = ['industries', 'roles'];

@Injectable()
export class TestUtils {
  constructor(@Inject('Connection') public connection: Connection) {
    if (process.env.NODE_ENV !== 'test') {
      throw new Error('ERROR-TEST-UTILS-ONLY-FOR-TESTS');
    }
  }

  public async closeDbConnection() {
    if (this.connection.isConnected) {
      await this.connection.close();
    }
  }

  public async getEntities() {
    const entities: any = [];
    this.connection.entityMetadatas.forEach((x) =>
      entities.push({ name: x.name, tableName: x.tableName }),
    );
    return entities.filter((v) => !ignoreEntities.includes(v.tableName));
  }
  public async reloadFixtures() {
    try {
      const entities = await this.getEntities();
      await this.cleanAll(entities);
      // TODO this not work as expect: Need to run like migration
      // await this.loadAll(entities);
    } catch (err) {
      throw err;
    }
  }
  public async cleanAll(entities: any) {
    try {
      await this.connection.query('SET FOREIGN_KEY_CHECKS = 0');
      for (const entity of entities) {
        try {
          const repository = await this.connection.getRepository(entity.name);
          await repository.query(`truncate  table  ${entity.tableName}`);
        } catch (err) {
          console.log('*****************************');
          console.log(err);
          console.log('*****************************');
        }
      }
    } catch (error) {
      console.log(error);
      throw new Error(`ERROR: Cleaning test db: ${error}`);
    } finally {
      await this.connection.query('SET FOREIGN_KEY_CHECKS = 1');
    }
  }

  public async loadAll(entities: any) {
    try {
      for (const entity of entities) {
        const repository = await this.connection.getRepository(entity.name);
        const fixtureFile = Path.join(
          __dirname,
          `../fixtures/entity/${entity.tableName}.json`,
        );
        if (fs.existsSync(fixtureFile)) {
          const items = JSON.parse(fs.readFileSync(fixtureFile, 'utf8'));
          await repository
            .createQueryBuilder(entity.name)
            .insert()
            .values(items)
            .execute();
        }
      }
    } catch (error) {
      throw new Error(
        `ERROR [TestUtils.loadAll()]: Loading fixtures on test db: ${error}`,
      );
    }
  }
}

export async function provideConnection(configService: ConfigService) {
  const cm = new ConnectionManager();
  const connection = cm.create({
    ...configService.get('db.test'),
    entities: [__dirname + '/../../**/*.entity.js'],
  });
  await connection.connect();
  return connection;
}
