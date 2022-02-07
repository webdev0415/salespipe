import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import configuration from 'src/config/configuration';
import * as request from 'supertest';
import { provideConnection, TestUtils } from './utils';

describe('contracts (e2e)', () => {
  let app: INestApplication;
  let testUtils: TestUtils;
  const createContractDto = {
    hirer: {
      id: '0a089336-0a48-11ec-bd3f-0242ac140002',
    },
    hiree: {
      id: '00f99098-0a48-11ec-bd3f-0242ac140002',
    },
    terms: [
      {
        rate: 20,
        hoursPerWeek: 40,
        startDate: '2021-09-10T12:46:18.121Z',
        endDate: '2021-10-10T12:46:18.121Z',
      },
    ],
    startDate: '2021-09-10T12:46:18.121Z',
    endDate: '2021-10-10T12:46:18.121Z',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
        }),
        AppModule,
      ],
      providers: [
        {
          provide: 'Connection',
          useFactory: provideConnection,
          inject: [ConfigService],
        },
        TestUtils,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    testUtils = moduleFixture.get<TestUtils>(TestUtils);
    await testUtils.reloadFixtures();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Permission (e2e)', () => {
    describe('Unauthentication (e2e)', () => {
      it('/contracts (GET)', async () => {
        const response = await request(app.getHttpServer()).get('/contracts');

        expect(response.status).toBe(401);
      });

      it('/contracts/:id (GET)', async () => {
        const response = await request(app.getHttpServer()).get(
          '/contracts/123',
        );

        expect(response.status).toBe(401);
      });

      it('/contracts (POST)', async () => {
        const response = await request(app.getHttpServer()).post('/contracts');

        expect(response.status).toBe(401);
      });

      it('/contracts/:id (PATCH)', async () => {
        const response = await request(app.getHttpServer()).patch(
          '/contracts/123',
        );

        expect(response.status).toBe(401);
      });

      it('/contracts/:id (DELETE)', async () => {
        const response = await request(app.getHttpServer()).delete(
          '/contracts/123',
        );

        expect(response.status).toBe(401);
      });
    });

    describe('USER role (e2e)', () => {
      let userToken: string;
      beforeAll(async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/login')
          .send({
            email: 'user@gmail.com',
            password: 'password',
          });

        userToken = response.body.access_token;

        expect(userToken).toBeDefined();
      });

      it('/contracts (GET)', async () => {
        const response = await request(app.getHttpServer())
          .get('/contracts')
          .set('Authorization', `Bearer ${userToken}`);

        expect(response.status).toBe(403);
      });

      it('/contracts/my (GET)', async () => {
        const response = await request(app.getHttpServer())
          .get('/contracts/my')
          .set('Authorization', `Bearer ${userToken}`);

        expect(response.status).toBe(200);
      });

      it('/contracts/:id (GET)', async () => {
        const response = await request(app.getHttpServer())
          .get('/contracts/123')
          .set('Authorization', `Bearer ${userToken}`);

        expect(response.status).toBe(403);
      });

      it('/contracts (POST)', async () => {
        const response = await request(app.getHttpServer())
          .post('/contracts')
          .send(createContractDto)
          .set('Authorization', `Bearer ${userToken}`);

        expect(response.status).toBe(403);
      });

      it('/contracts/:id (PATCH)', async () => {
        const response = await request(app.getHttpServer())
          .patch('/contracts/123')
          .send({
            startDate: '2021-09-11T12:46:18.121Z',
            endDate: '2021-09-11T12:46:18.121Z',
          })
          .set('Authorization', `Bearer ${userToken}`);

        expect(response.status).toBe(404);
      });

      it('/contracts/:id (DELETE)', async () => {
        const response = await request(app.getHttpServer())
          .delete('/contracts/123')
          .set('Authorization', `Bearer ${userToken}`);

        expect(response.status).toBe(403);
      });
    });

    describe('HIRER role (e2e)', () => {
      let hirerToken: string;
      beforeAll(async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/login')
          .send({
            email: 'hirer@gmail.com',
            password: 'password',
          });

        hirerToken = response.body.access_token;

        expect(hirerToken).toBeDefined();
      });

      it('/contracts (GET)', async () => {
        const response = await request(app.getHttpServer())
          .get('/contracts')
          .set('Authorization', `Bearer ${hirerToken}`);

        expect(response.status).toBe(403);
      });

      it('/contracts/my (GET)', async () => {
        const response = await request(app.getHttpServer())
          .get('/contracts/my')
          .set('Authorization', `Bearer ${hirerToken}`);

        expect(response.status).toBe(200);
      });

      it('/contracts/:id (GET)', async () => {
        const response = await request(app.getHttpServer())
          .get('/contracts/123')
          .set('Authorization', `Bearer ${hirerToken}`);

        expect(response.status).toBe(403);
      });

      it('/contracts (POST)', async () => {
        const response = await request(app.getHttpServer())
          .post('/contracts')
          .send(createContractDto)
          .set('Authorization', `Bearer ${hirerToken}`);

        expect(response.status).toBe(201);
      });

      it('/contracts/:id (PATCH)', async () => {
        const response = await request(app.getHttpServer())
          .patch('/contracts/123')
          .send({
            startDate: '2021-09-11T12:46:18.121Z',
            endDate: '2021-09-11T12:46:18.121Z',
          })
          .set('Authorization', `Bearer ${hirerToken}`);

        expect(response.status).toBe(404);
      });

      it('/contracts/:id (DELETE)', async () => {
        const response = await request(app.getHttpServer())
          .delete('/contracts/123')
          .set('Authorization', `Bearer ${hirerToken}`);

        expect(response.status).toBe(404);
      });
    });

    describe('ADMIN role (e2e)', () => {
      let adminToken: string;
      beforeAll(async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/login')
          .send({
            email: 'admin@gmail.com',
            password: 'password',
          });

        adminToken = response.body.access_token;

        expect(adminToken).toBeDefined();
      });

      it('/contracts (GET)', async () => {
        const response = await request(app.getHttpServer())
          .get('/contracts')
          .set('Authorization', `Bearer ${adminToken}`);

        expect(response.status).toBe(200);
      });

      it('/contracts/:id (GET)', async () => {
        const response = await request(app.getHttpServer())
          .get('/contracts/123')
          .set('Authorization', `Bearer ${adminToken}`);

        expect(response.status).toBe(200);
      });

      it('/contracts (POST)', async () => {
        const response = await request(app.getHttpServer())
          .post('/contracts')
          .send(createContractDto)
          .set('Authorization', `Bearer ${adminToken}`);

        expect(response.status).toBe(403);
      });

      it('/contracts/:id (PATCH)', async () => {
        const response = await request(app.getHttpServer())
          .patch('/contracts/123')
          .send({
            startDate: '2021-09-11T12:46:18.121Z',
            endDate: '2021-09-11T12:46:18.121Z',
          })
          .set('Authorization', `Bearer ${adminToken}`);

        expect(response.status).toBe(403);
      });

      it('/contracts/:id (DELETE)', async () => {
        const response = await request(app.getHttpServer())
          .delete('/contracts/123')
          .set('Authorization', `Bearer ${adminToken}`);

        expect(response.status).toBe(404);
      });
    });
  });

  describe('Bussiness (e2e)', () => {
    let adminToken: string;
    let hirerToken: string;
    let userToken: string;
    beforeAll(async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'hirer@gmail.com',
          password: 'password',
        });

      hirerToken = response.body.access_token;

      expect(hirerToken).toBeDefined();

      const response2 = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'admin@gmail.com',
          password: 'password',
        });

      adminToken = response2.body.access_token;

      expect(adminToken).toBeDefined();

      const response3 = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'user@gmail.com',
          password: 'password',
        });

      userToken = response3.body.access_token;

      expect(userToken).toBeDefined();
    });

    it('/contracts (GET): User can get her contracts', async () => {});

    it('/contracts (GET): Hirer can get her contracts', async () => {});

    it('/contracts (GET): Hirer can initial a contract', async () => {});

    it('/contracts (GET): User can accept a contract', async () => {});

    it('/contracts (GET): User can reject a contract', async () => {});
  });
});
