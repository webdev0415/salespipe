import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import configuration from 'src/config/configuration';
import { UserProfile } from 'src/user-profiles/entities/user-profile.entity';
import { UsersService } from 'src/users/users.service';
import * as request from 'supertest';
import { users } from './fixtures/entity/users';
import { provideConnection, TestUtils } from './utils';

describe('User-profiles (e2e)', () => {
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

  describe('Permission (e2e)', () => {
    describe('Unauthentication (e2e)', () => {
      it('/user-profiles (GET)', async () => {
        const response = await request(app.getHttpServer()).get(
          '/user-profiles',
        );

        expect(response.status).toBe(401);
      });

      it('/user-profiles/:id (GET)', async () => {
        const response = await request(app.getHttpServer()).get(
          '/user-profiles/123',
        );

        expect(response.status).toBe(401);
      });

      it('/user-profiles (POST)', async () => {
        const response = await request(app.getHttpServer()).post(
          '/user-profiles',
        );

        expect(response.status).toBe(401);
      });

      it('/user-profiles/:id (PATCH)', async () => {
        const response = await request(app.getHttpServer()).patch(
          '/user-profiles/123',
        );

        expect(response.status).toBe(401);
      });

      it('/user-profiles/:id (DELETE)', async () => {
        const response = await request(app.getHttpServer()).delete(
          '/user-profiles/123',
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

      it('/user-profiles (GET)', async () => {
        const response = await request(app.getHttpServer())
          .get('/user-profiles')
          .set('Authorization', `Bearer ${userToken}`);

        expect(response.status).toBe(403);
      });

      it('/user-profiles/:id (GET)', async () => {
        const response = await request(app.getHttpServer())
          .get('/user-profiles/123')
          .set('Authorization', `Bearer ${userToken}`);

        expect(response.status).toBe(403);
      });

      it('/user-profiles (POST)', async () => {
        const response = await request(app.getHttpServer())
          .post('/user-profiles')
          .set('Authorization', `Bearer ${userToken}`);

        expect(response.status).toBe(403);
      });

      it('/user-profiles/:id (PATCH)', async () => {
        const response = await request(app.getHttpServer())
          .patch('/user-profiles/123')
          .set('Authorization', `Bearer ${userToken}`);

        expect(response.status).toBe(403);
      });

      it('/user-profiles/:id (DELETE)', async () => {
        const response = await request(app.getHttpServer())
          .delete('/user-profiles/123')
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

      it('/user-profiles (GET)', async () => {
        const response = await request(app.getHttpServer())
          .get('/user-profiles')
          .set('Authorization', `Bearer ${hirerToken}`);

        expect(response.status).toBe(200);
      });

      it('/user-profiles/:id (GET)', async () => {
        const response = await request(app.getHttpServer())
          .get('/user-profiles/123')
          .set('Authorization', `Bearer ${hirerToken}`);

        expect(response.status).toBe(200);
      });

      it('/user-profiles (POST)', async () => {
        const response = await request(app.getHttpServer())
          .post('/user-profiles')
          .set('Authorization', `Bearer ${hirerToken}`);

        expect(response.status).toBe(403);
      });

      it('/user-profiles/:id (PATCH)', async () => {
        const response = await request(app.getHttpServer())
          .patch('/user-profiles/123')
          .set('Authorization', `Bearer ${hirerToken}`);

        expect(response.status).toBe(403);
      });

      it('/user-profiles/:id (DELETE)', async () => {
        const response = await request(app.getHttpServer())
          .delete('/user-profiles/123')
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

      it('/user-profiles (GET)', async () => {
        const response = await request(app.getHttpServer())
          .get('/user-profiles')
          .set('Authorization', `Bearer ${adminToken}`);

        expect(response.status).toBe(200);
      });

      it('/user-profiles/:id (GET)', async () => {
        const response = await request(app.getHttpServer())
          .get('/user-profiles/123')
          .set('Authorization', `Bearer ${adminToken}`);

        expect(response.status).toBe(200);
      });

      it('/user-profiles (POST)', async () => {
        const response = await request(app.getHttpServer())
          .post('/user-profiles')
          .set('Authorization', `Bearer ${adminToken}`);

        expect(response.status).toBe(403);
      });

      it('/user-profiles/:id (PATCH)', async () => {
        const response = await request(app.getHttpServer())
          .patch('/user-profiles/123')
          .set('Authorization', `Bearer ${adminToken}`);

        expect(response.status).toBe(404);
      });

      it('/user-profiles/:id (DELETE)', async () => {
        const response = await request(app.getHttpServer())
          .delete('/user-profiles/123')
          .set('Authorization', `Bearer ${adminToken}`);

        expect(response.status).toBe(204);
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

    it('/user-profiles (GET): Only get verified profiles', async () => {
      let response = await request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          type: 'USER',
          username: 'user5',
          email: 'user5@gmail.com',
          password: 'password',
          firstName: 'user5',
          lastName: 'user5',
        });
      expect(response.status).toBe(201);

      const {
        body: { access_token },
      } = await request(app.getHttpServer()).post('/auth/login').send({
        email: 'user5@gmail.com',
        password: 'password',
      });
      expect(access_token).toBeDefined();

      response = await request(app.getHttpServer())
        .post('/user-profiles/my')
        .set('Authorization', `Bearer ${access_token}`)
        .send({
          phone: '+84912333444',
          email: 'email@gmail.com',
          rate: '20',
          hours_per_week: 20,
          avatar: 'http://avatar.com/img.jpg',
          headline: 'headline',
          bio: 'bio',
          countryId: 'dba7019a-29b7-45ff-a659-1e10615e13ff',
          languages: [
            {
              id: '253c634a-59ae-451f-9dac-d2362ccf6b24',
            },
          ],
          yose: 3,
          industries: [
            {
              id: '0ca30200-b277-4912-a3f4-cf1e9e71764c',
            },
          ],
          saleChannels: 'online',
          saleSkills: 'ads',
          saleTools: 'jira,crm',
          workHistory: 'No work history',
        });
      expect(response.status).toBe(201);

      response = await request(app.getHttpServer())
        .get('/user-profiles')
        .set('Authorization', `Bearer ${hirerToken}`);

      expect(response.status).toBe(200);
      const profiles = response.body.data;
      expect(profiles).toStrictEqual([]);
    });

    it('/user-profiles (GET): Can verify a user profile', async () => {
      let response = await request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          type: 'USER',
          username: 'user6',
          email: 'user6@gmail.com',
          password: 'password',
          firstName: 'user6',
          lastName: 'user6',
        });
      expect(response.status).toBe(201);

      const {
        body: { access_token },
      } = await request(app.getHttpServer()).post('/auth/login').send({
        email: 'user6@gmail.com',
        password: 'password',
      });
      expect(access_token).toBeDefined();

      response = await request(app.getHttpServer())
        .post('/user-profiles/my')
        .set('Authorization', `Bearer ${access_token}`)
        .send({
          phone: '+84912333444',
          email: 'user6@gmail.com',
          rate: '20',
          hours_per_week: 20,
          avatar: 'http://avatar.com/img.jpg',
          headline: 'headline',
          bio: 'bio',
          countryId: 'dba7019a-29b7-45ff-a659-1e10615e13ff',
          languages: [
            {
              id: '253c634a-59ae-451f-9dac-d2362ccf6b24',
            },
          ],
          yose: 3,
          industries: [
            {
              id: '0ca30200-b277-4912-a3f4-cf1e9e71764c',
            },
          ],
          saleChannels: 'online',
          saleSkills: 'ads',
          saleTools: 'jira,crm',
          workHistory: 'No work history',
        });
      expect(response.status).toBe(201);

      response = await request(app.getHttpServer())
        .patch(`/user-profiles/${response.body.id}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(204);

      response = await request(app.getHttpServer())
        .get('/user-profiles')
        .set('Authorization', `Bearer ${hirerToken}`);

      expect(response.status).toBe(200);
      const profiles = response.body.data;
      expect(profiles.length).toBe(1);
    });

    it('/user-profiles (GET): Can see only public fields', async () => {
      const response = await request(app.getHttpServer())
        .get('/user-profiles')
        .set('Authorization', `Bearer ${hirerToken}`);

      expect(response.status).toBe(200);
      const profile: UserProfile = response.body.data[0];
      expect(profile).toBeDefined();
      expect(profile.email).toBeUndefined();
      expect(profile.phone).toBeUndefined();
      expect(profile.linkedIn).toBeUndefined();
      expect(profile.rate).toBeUndefined();
      expect(profile.hoursPerWeek).toBeUndefined();
    });

    it('/user-profiles/my (GET): Owner can see all fields', async () => {
      let response = await request(app.getHttpServer())
        .post('/user-profiles/my')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          phone: '+84912333444',
          email: 'email@gmail.com',
          rate: '20',
          hours_per_week: 20,
          avatar: 'http://avatar.com/img.jpg',
          headline: 'headline',
          bio: 'bio',
          countryId: 'dba7019a-29b7-45ff-a659-1e10615e13ff',
          languages: [
            {
              id: '253c634a-59ae-451f-9dac-d2362ccf6b24',
            },
          ],
          yose: 3,
          industries: [
            {
              id: '0ca30200-b277-4912-a3f4-cf1e9e71764c',
            },
          ],
          saleChannels: 'online',
          saleSkills: 'ads',
          saleTools: 'jira,crm',
          workHistory: 'No work history',
        });
      expect(response.status).toBe(201);

      response = await request(app.getHttpServer())
        .get('/user-profiles/my')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).toBe(200);
      const profile: UserProfile = response.body;
      expect(profile).toBeDefined();
      expect(profile.email).toBeDefined();
      expect(profile.phone).toBeDefined();
      expect(profile.linkedIn).toBeDefined();
      expect(profile.rate).toBeDefined();
      expect(profile.hoursPerWeek).toBeDefined();
    });

    it('/user-profiles/my/status (PATCH): Owner can switch avaiability status', async () => {
      let response = await request(app.getHttpServer())
        .patch('/user-profiles/my/status')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          isAvailable: false,
        });

      expect(response.status).toBe(204);

      response = await request(app.getHttpServer())
        .get('/user-profiles/my')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).toBe(200);
      expect(response.body.isAvailable).toBe(false);

      response = await request(app.getHttpServer())
        .patch('/user-profiles/my/status')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          isAvailable: true,
        });
      expect(response.status).toBe(204);

      response = await request(app.getHttpServer())
        .get('/user-profiles/my')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).toBe(200);
      expect(response.body.isAvailable).toBe(true);
    });
  });
});
