import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { Industry } from 'src/industries/entities/industry.entity';
import * as request from 'supertest';

describe('Industries (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/industries (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/industries');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(3);

    const country: Industry = response.body[0];
    expect(country.id).toBeDefined();
    expect(country.name).toBeDefined();
    expect(country.code).toBeDefined();
  });
});
