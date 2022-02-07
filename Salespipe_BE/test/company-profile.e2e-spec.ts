import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import configuration from 'src/config/configuration';
import { UsersService } from 'src/users/users.service';
import * as request from 'supertest';
import { users } from './fixtures/entity/users';
import { provideConnection, TestUtils } from './utils';

describe('Company-profiles (e2e)', () => {
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
    testUtils = moduleFixture.get<TestUtils>(TestUtils);
    await testUtils.reloadFixtures();
    userService = app.get(UsersService);
    await app.init();

    await Promise.all(
      users.map((u: any) => {
        return userService.create(u);
      }),
    );
  }, 20000);

  afterAll(async () => {
    await app.close();
  });

  describe('Unauthentication (e2e)', () => {
    it('/company-profiles (GET)', async () => {
      const response = await request(app.getHttpServer()).get(
        '/company-profiles',
      );

      expect(response.status).toBe(401);
    });

    it('/company-profiles/:id (GET)', async () => {
      const response = await request(app.getHttpServer()).get(
        '/company-profiles/123',
      );

      expect(response.status).toBe(401);
    });

    it('/company-profiles (POST)', async () => {
      const response = await request(app.getHttpServer()).post(
        '/company-profiles',
      );

      expect(response.status).toBe(401);
    });

    it('/company-profiles/:id (PATCH)', async () => {
      const response = await request(app.getHttpServer()).patch(
        '/company-profiles/123',
      );

      expect(response.status).toBe(401);
    });

    it('/company-profiles/:id (DELETE)', async () => {
      const response = await request(app.getHttpServer()).delete(
        '/company-profiles/123',
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

    it('/company-profiles (GET)', async () => {
      const response = await request(app.getHttpServer())
        .get('/company-profiles')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).toBe(403);
    });

    it('/company-profiles/:id (GET)', async () => {
      const response = await request(app.getHttpServer())
        .get('/company-profiles/123')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).toBe(403);
    });

    it('/company-profiles (POST)', async () => {
      const response = await request(app.getHttpServer())
        .post('/company-profiles')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).toBe(403);
    });

    it('/company-profiles/:id (PATCH)', async () => {
      const response = await request(app.getHttpServer())
        .patch('/company-profiles/123')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).toBe(403);
    });

    it('/company-profiles/:id (DELETE)', async () => {
      const response = await request(app.getHttpServer())
        .delete('/company-profiles/123')
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

    it('/company-profiles (GET)', async () => {
      const response = await request(app.getHttpServer())
        .get('/company-profiles')
        .set('Authorization', `Bearer ${hirerToken}`);

      expect(response.status).toBe(403);
    });

    it('/company-profiles/:id (GET)', async () => {
      const response = await request(app.getHttpServer())
        .get('/company-profiles/123')
        .set('Authorization', `Bearer ${hirerToken}`);

      expect(response.status).toBe(403);
    });

    it('/company-profiles (POST)', async () => {
      const response = await request(app.getHttpServer())
        .post('/company-profiles')
        .set('Authorization', `Bearer ${hirerToken}`);

      expect(response.status).toBe(403);
    });

    it('/company-profiles/:id (PATCH)', async () => {
      const response = await request(app.getHttpServer())
        .patch('/company-profiles/123')
        .set('Authorization', `Bearer ${hirerToken}`);

      expect(response.status).toBe(403);
    });

    it('/company-profiles/:id (DELETE)', async () => {
      const response = await request(app.getHttpServer())
        .delete('/company-profiles/123')
        .set('Authorization', `Bearer ${hirerToken}`);

      expect(response.status).toBe(403);
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

    it('/company-profiles (GET)', async () => {
      const response = await request(app.getHttpServer())
        .get('/company-profiles')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
    });

    it('/company-profiles/:id (GET)', async () => {
      const response = await request(app.getHttpServer())
        .get('/company-profiles/123')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
    });

    it('/company-profiles (POST)', async () => {
      const response = await request(app.getHttpServer())
        .post('/company-profiles')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(403);
    });

    it('/company-profiles/:id (PATCH)', async () => {
      const response = await request(app.getHttpServer())
        .patch('/company-profiles/123')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(403);
    });

    it('/company-profiles/:id (DELETE)', async () => {
      const response = await request(app.getHttpServer())
        .delete('/company-profiles/123')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(404);
    });
  });
});
