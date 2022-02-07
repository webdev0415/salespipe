import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import configuration from 'src/config/configuration';
import { UsersService } from 'src/users/users.service';
import * as request from 'supertest';
import { users } from './fixtures/entity/users';
import { provideConnection, TestUtils } from './utils';

describe('contracts (e2e)', () => {
  let app: INestApplication;
  let testUtils: TestUtils;
  let userService: UsersService;

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
    userService = app.get(UsersService);
    testUtils = moduleFixture.get<TestUtils>(TestUtils);
    await testUtils.reloadFixtures();
    await Promise.all(
      users.map((u: any) => {
        return userService.create(u);
      }),
    );
    await app.init();
  }, 10000);

  afterAll(async () => {
    await app.close();
  });

  describe('Permission (e2e)', () => {
    describe('Unauthentication (e2e)', () => {
      it('/contracts/:contractId/terms (GET)', async () => {
        const response = await request(app.getHttpServer()).get(
          '/contracts/:contractId/terms',
        );

        expect(response.status).toBe(401);
      });

      it('/contracts/:contractId/terms/:id (GET)', async () => {
        const response = await request(app.getHttpServer()).get(
          '/contracts/:contractId/terms/123',
        );

        expect(response.status).toBe(401);
      });

      it('/contracts/:contractId/terms (POST)', async () => {
        const response = await request(app.getHttpServer()).post(
          '/contracts/:contractId/terms',
        );

        expect(response.status).toBe(401);
      });

      it('/contracts/:contractId/terms/:id (PATCH)', async () => {
        const response = await request(app.getHttpServer())
          .patch('/contracts/:contractId/terms/123')
          .send({
            rate: 21,
          });

        expect(response.status).toBe(401);
      });

      it('/contracts/:contractId/terms/:id (DELETE)', async () => {
        const response = await request(app.getHttpServer()).delete(
          '/contracts/:contractId/terms/123',
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

      it('/contracts/:contractId/terms (GET)', async () => {
        const response = await request(app.getHttpServer())
          .get('/contracts/:contractId/terms')
          .set('Authorization', `Bearer ${userToken}`);

        expect(response.status).toBe(200);
      });

      it('/contracts/:contractId/terms/:id (GET)', async () => {
        const response = await request(app.getHttpServer())
          .get('/contracts/:contractId/terms/123')
          .set('Authorization', `Bearer ${userToken}`);

        expect(response.status).toBe(404);
      });

      it('/contracts/:contractId/terms (POST)', async () => {
        const response = await request(app.getHttpServer())
          .post('/contracts/:contractId/terms')
          .set('Authorization', `Bearer ${userToken}`);

        expect(response.status).toBe(403);
      });

      it.skip('/contracts/:contractId/terms/:id (PATCH)', async () => {
        const response = await request(app.getHttpServer())
          .patch('/contracts/:contractId/terms/123')
          .send({
            rate: 21,
          })
          .set('Authorization', `Bearer ${userToken}`);

        expect(response.status).toBe(204);
      });

      it('/contracts/:contractId/terms/:id (DELETE)', async () => {
        const response = await request(app.getHttpServer())
          .delete('/contracts/:contractId/terms/123')
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

      it('/contracts/:contractId/terms (GET)', async () => {
        const response = await request(app.getHttpServer())
          .get('/contracts/:contractId/terms')
          .set('Authorization', `Bearer ${hirerToken}`);

        expect(response.status).toBe(200);
      });

      it('/contracts/:contractId/terms/:id (GET)', async () => {
        const response = await request(app.getHttpServer())
          .get('/contracts/:contractId/terms/123')
          .set('Authorization', `Bearer ${hirerToken}`);

        expect(response.status).toBe(404);
      });

      it.skip('/contracts/:contractId/terms (POST)', async () => {
        const response = await request(app.getHttpServer())
          .post('/contracts/:contractId/terms')
          .set('Authorization', `Bearer ${hirerToken}`);

        expect(response.status).toBe(201);
      });

      it.skip('/contracts/:contractId/terms/:id (PATCH)', async () => {
        const response = await request(app.getHttpServer())
          .patch('/contracts/:contractId/terms/123')
          .send({
            rate: 21,
          })
          .set('Authorization', `Bearer ${hirerToken}`);

        expect(response.status).toBe(204);
      });

      it('/contracts/:contractId/terms/:id (DELETE)', async () => {
        const response = await request(app.getHttpServer())
          .delete('/contracts/:contractId/terms/123')
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

      it('/contracts/:contractId/terms (GET)', async () => {
        const response = await request(app.getHttpServer())
          .get('/contracts/:contractId/terms')
          .set('Authorization', `Bearer ${adminToken}`);

        expect(response.status).toBe(200);
      });

      it('/contracts/:contractId/terms/:id (GET)', async () => {
        const response = await request(app.getHttpServer())
          .get('/contracts/:contractId/terms/123')
          .set('Authorization', `Bearer ${adminToken}`);

        expect(response.status).toBe(404);
      });

      it('/contracts/:contractId/terms (POST)', async () => {
        const response = await request(app.getHttpServer())
          .post('/contracts/:contractId/terms')
          .set('Authorization', `Bearer ${adminToken}`);

        expect(response.status).toBe(403);
      });

      it('/contracts/:contractId/terms/:id (PATCH)', async () => {
        const response = await request(app.getHttpServer())
          .patch('/contracts/:contractId/terms/123')
          .send({
            rate: 21,
          })
          .set('Authorization', `Bearer ${adminToken}`);

        expect(response.status).toBe(403);
      });

      it('/contracts/:contractId/terms/:id (DELETE)', async () => {
        const response = await request(app.getHttpServer())
          .delete('/contracts/:contractId/terms/123')
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
