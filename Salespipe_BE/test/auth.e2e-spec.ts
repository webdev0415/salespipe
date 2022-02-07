import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import * as moment from 'moment';
import { AppModule } from 'src/app.module';
import { ForgotPasswordTokenService } from 'src/auth/forgot-password-token.service';
import { SignupTokenService } from 'src/auth/signup-token.service';
import configuration from 'src/config/configuration';
import { EmailAuthService } from 'src/email/email-auth.service';
import { UsersService } from 'src/users/users.service';
import * as request from 'supertest';
import { users } from './fixtures/entity/users';
import { provideConnection, TestUtils } from './utils';
import * as faker from 'faker';
import { SignupPrepareTokenService } from 'src/auth/signup-prepare-token.service';

describe('Auth (e2e)', () => {
  let app: INestApplication;
  let signupPrepareTokenService: SignupPrepareTokenService;
  let signupTokenService: SignupTokenService;
  let forgotPasswordTokenService: ForgotPasswordTokenService;
  let userService: UsersService;
  let emailAuthService: EmailAuthService;
  let testUtils: TestUtils;

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
    signupPrepareTokenService = app.get(SignupPrepareTokenService);
    signupTokenService = app.get(SignupTokenService);
    forgotPasswordTokenService = app.get(ForgotPasswordTokenService);
    await testUtils.reloadFixtures();
    userService = app.get(UsersService);
    emailAuthService = app.get(EmailAuthService);
    emailAuthService.createdAccount = jest.fn();
    emailAuthService.forgotPasswordRequest = jest.fn();
    emailAuthService.signupEmailPrepare = jest.fn();
    emailAuthService.signupEmailConfirm = jest.fn();
    emailAuthService.changePasswordRequest = jest.fn();
    emailAuthService.changedPassword = jest.fn();
    emailAuthService.forgotPasswordRequest = jest.fn();
    await Promise.all(
      users.map((u: any) => {
        return userService.create(u);
      }),
    );
    await app.init();
  }, 20000);

  afterAll(async () => {
    await app.close();
  });

  describe('Signup (e2e)', () => {
    describe('Signup old flow (e2e)', () => {
      it('/auth/signup (POST): Can register new account', async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/signup')
          .send({
            type: 'SDR',
            username: 'user7',
            email: 'user7@gmail.com',
            password: 'password',
            firstName: 'user7',
            lastName: 'user7',
          });
        expect(response.status).toBe(201);
        expect(response.body.username).toBeDefined();
        expect(response.body.password).toBeUndefined();
      });

      it('/auth/signup (POST): Cannot register new account with same email', async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/signup')
          .send({
            type: 'SDR',
            username: 'user7',
            email: 'user7@gmail.com',
            password: 'password',
            firstName: 'user7',
            lastName: 'user7',
          });
        expect(response.status).toBe(500);
      });

      it('/auth/signup (POST): Remove password from response', async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/signup')
          .send({
            type: 'SDR',
            username: 'user5',
            email: 'user5@gmail.com',
            password: 'password',
            firstName: 'user5',
            lastName: 'user5',
          });
        expect(response.status).toBe(201);
        expect(response.body).toBeDefined();
        expect(response.body.password).toBeUndefined();
      });
    });

    describe('Confirm old account (e2e)', () => {
      it('/auth/signup/confirm (POST): Can confirm account with correct code', async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/signup')
          .send({
            type: 'SDR',
            username: 'user8',
            email: 'user8@gmail.com',
            password: 'password',
            firstName: 'user8',
            lastName: 'user8',
          });
        expect(response.status).toBe(201);

        const token = await signupTokenService.findByUserId(response.body.id);
        expect(token.code).toBeDefined();
        expect(token.userId).toBe(response.body.id);
        expect(token.expiryDate.getTime()).toBeLessThanOrEqual(
          moment().add(25, 'hours').toDate().getTime(),
        );
        expect(token.expiryDate.getTime()).toBeGreaterThanOrEqual(
          moment().add(23, 'hours').toDate().getTime(),
        );

        const confirmResponse = await request(app.getHttpServer())
          .post('/auth/signup/confirm')
          .send({
            code: token.code,
          });

        expect(confirmResponse.status).toBe(201);
      });

      it('/auth/signup/confirm (POST): Can not confirm account with wrong code', async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/signup')
          .send({
            type: 'SDR',
            username: 'user9',
            email: 'user9@gmail.com',
            password: 'password',
            firstName: 'user9',
            lastName: 'user9',
          });
        expect(response.status).toBe(201);

        const confirmResponse = await request(app.getHttpServer())
          .post('/auth/signup/confirm')
          .send({
            code: '79ac6757-3779-4762-a54d-b6fa4131f1a2',
          });

        expect(confirmResponse.status).toBe(404);
      });

      it('/auth/signup/confirm (POST): Can not confirm account with expire token', async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/signup')
          .send({
            type: 'SDR',
            username: 'user10',
            email: 'user10@gmail.com',
            password: 'password',
            firstName: 'user10',
            lastName: 'user10',
          });
        expect(response.status).toBe(201);

        expect(emailAuthService.createdAccount).toHaveBeenCalled();

        const token = await signupTokenService.findByUserId(response.body.id);
        await signupTokenService.updateByUserId(response.body.id, {
          expiryDate: moment().add(-1, 'minutes').toDate(),
        });

        const confirmResponse = await request(app.getHttpServer())
          .post('/auth/signup/confirm')
          .send({
            code: token.code,
          });

        expect(confirmResponse.status).toBe(400);
      }, 10000);
    });

    describe('Signup new flow (e2e)', () => {
      it('/auth/signup/email-prepare (POST): Can prepare new account', async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/signup/email-prepare')
          .send({
            email: faker.internet.email(),
          });
        expect(response.status).toBe(201);
      });

      it('/auth/signup/email-prepare (POST): Cannot prepare new account with same email', async () => {
        const email = faker.internet.email();
        const response = await request(app.getHttpServer())
          .post('/auth/signup/email-prepare')
          .send({
            email,
          });
        expect(response.status).toBe(201);

        const response2 = await request(app.getHttpServer())
          .post('/auth/signup/email-prepare')
          .send({
            email,
          });
        expect(response2.status).toBe(500);
      });

      it('/auth/signup/email-prepare (POST): Cannot prepare new account with same email with exist user', async () => {
        const email = faker.internet.email();
        const response = await request(app.getHttpServer())
          .post('/auth/signup')
          .send({
            type: 'SDR',
            username: faker.internet.userName(),
            email,
            password: faker.internet.password(),
            firstName: faker.name.findName(),
            lastName: faker.name.lastName(),
          });
        expect(response.status).toBe(201);

        const response2 = await request(app.getHttpServer())
          .post('/auth/signup/email-prepare')
          .send({
            email,
          });
        expect(response2.status).toBe(400);
      });

      it('/auth/signup/email-confirm (POST): Can confirm new account', async () => {
        const email = faker.internet.email();
        const response = await request(app.getHttpServer())
          .post('/auth/signup/email-prepare')
          .send({
            email,
          });
        expect(response.status).toBe(201);

        const token = await signupPrepareTokenService.findByEmail(email);
        expect(token).toBeDefined();

        const confirmResponse = await request(app.getHttpServer())
          .post('/auth/signup/email-confirm')
          .send({
            code: token.code,
            type: 'SDR',
            username: faker.internet.userName(),
            email,
            password: faker.internet.password(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
          });
        expect(confirmResponse.status).toBe(201);
      });

      it('/auth/signup/email-confirm (POST): Can not confirm with wrong code', async () => {
        const email = faker.internet.email();
        const response = await request(app.getHttpServer())
          .post('/auth/signup/email-prepare')
          .send({
            email,
          });
        expect(response.status).toBe(201);

        const confirmResponse = await request(app.getHttpServer())
          .post('/auth/signup/email-confirm')
          .send({
            code: faker.datatype.uuid(),
            type: 'SDR',
            username: faker.internet.userName(),
            email,
            password: faker.internet.password(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
          });
        expect(confirmResponse.status).toBe(404);
      });
    });

    describe('Forgot password (e2e)', () => {
      it('/auth/forgot-password-request (POST): Can request forgot password', async () => {
        const userResponse = await request(app.getHttpServer())
          .post('/auth/signup')
          .send({
            type: 'SDR',
            username: 'user11',
            email: 'user11@gmail.com',
            password: 'password',
            firstName: 'user11',
            lastName: 'user11',
          });
        expect(userResponse.status).toBe(201);

        const response = await request(app.getHttpServer())
          .post('/auth/forgot-password-request')
          .send({
            email: 'user11@gmail.com',
          });

        expect(response.status).toBe(201);
        expect(emailAuthService.forgotPasswordRequest).toHaveBeenCalledTimes(1);

        const token = await forgotPasswordTokenService.findByUserId(
          userResponse.body.id,
        );

        expect(token.code).toBeDefined();
        expect(token.userId).toBe(userResponse.body.id);
        expect(token.expiryDate.getTime()).toBeLessThanOrEqual(
          moment().add(25, 'hours').toDate().getTime(),
        );
        expect(token.expiryDate.getTime()).toBeGreaterThanOrEqual(
          moment().add(23, 'hours').toDate().getTime(),
        );

        const confirmResponse = await request(app.getHttpServer())
          .post('/auth/forgot-password-change')
          .send({
            code: token.code,
            email: 'user11@gmail.com',
            password: '123',
          });

        expect(confirmResponse.status).toBe(201);
      });

      it('/auth/forgot-password-request (POST): Can change request forgot password with wrong email', async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/forgot-password-request')
          .send({
            email: 'user99@gmail.com',
          });

        expect(response.status).toBe(404);
      });

      it('/auth/forgot-password-change (POST): Can change forgot password with wrong code', async () => {
        const userResponse = await request(app.getHttpServer())
          .post('/auth/signup')
          .send({
            type: 'SDR',
            username: 'user12',
            email: 'user12@gmail.com',
            password: 'password',
            firstName: 'user12',
            lastName: 'user12',
          });
        expect(userResponse.status).toBe(201);

        const response = await request(app.getHttpServer())
          .post('/auth/forgot-password-request')
          .send({
            email: 'user12@gmail.com',
          });

        expect(response.status).toBe(201);

        const confirmResponse = await request(app.getHttpServer())
          .post('/auth/forgot-password-change')
          .send({
            code: 'eead32da-c5d2-4710-be80-10b7106ad215',
            email: 'user12@gmail.com',
            password: '123',
          });

        expect(confirmResponse.status).toBe(404);
      });

      it('/auth/forgot-password-request (POST): Can change forgot password with wrong email', async () => {
        const userResponse = await request(app.getHttpServer())
          .post('/auth/signup')
          .send({
            type: 'SDR',
            username: 'user13',
            email: 'user13@gmail.com',
            password: 'password',
            firstName: 'user13',
            lastName: 'user13',
          });
        expect(userResponse.status).toBe(201);

        const response = await request(app.getHttpServer())
          .post('/auth/forgot-password-request')
          .send({
            email: 'user13@gmail.com',
          });

        expect(response.status).toBe(201);

        const token = await forgotPasswordTokenService.findByUserId(
          userResponse.body.id,
        );

        const confirmResponse = await request(app.getHttpServer())
          .post('/auth/forgot-password-change')
          .send({
            code: token.code,
            email: 'user14@gmail.com',
            password: '123',
          });

        expect(confirmResponse.status).toBe(404);
      });
    });

    describe('Change password (e2e)', () => {
      it('/auth/change-password-request (POST): Can change password', async () => {
        const userResponse = await request(app.getHttpServer())
          .post('/auth/signup')
          .send({
            type: 'SDR',
            username: 'user14',
            email: 'user14@gmail.com',
            password: 'password',
            firstName: 'user14',
            lastName: 'user14',
          });
        expect(userResponse.status).toBe(201);

        const loginResponse = await request(app.getHttpServer())
          .post('/auth/login')
          .send({
            email: 'user14@gmail.com',
            password: 'password',
          });

        const authToken = loginResponse.body.access_token;
        expect(authToken).toBeDefined();

        const response = await request(app.getHttpServer())
          .post('/auth/change-password')
          .set('authorization', `Bearer ${authToken}`)
          .send({
            oldPassword: 'password',
            password: 'password2',
          });

        expect(response.status).toBe(201);

        const changedPasswordResponse = await request(app.getHttpServer())
          .post('/auth/login')
          .send({
            email: 'user14@gmail.com',
            password: 'password2',
          });

        expect(changedPasswordResponse.status).toBe(200);
      });

      it('/auth/change-password-request (POST): Can not with wrong old password', async () => {
        const userResponse = await request(app.getHttpServer())
          .post('/auth/signup')
          .send({
            type: 'SDR',
            username: 'user15',
            email: 'user15@gmail.com',
            password: 'password',
            firstName: 'user15',
            lastName: 'user15',
          });
        expect(userResponse.status).toBe(201);

        const loginResponse = await request(app.getHttpServer())
          .post('/auth/login')
          .send({
            email: 'user15@gmail.com',
            password: 'password',
          });

        const authToken = loginResponse.body.access_token;
        expect(authToken).toBeDefined();

        const response = await request(app.getHttpServer())
          .post('/auth/change-password')
          .set('authorization', `Bearer ${authToken}`)
          .send({
            oldPassword: 'wrong',
            password: 'password2',
          });

        expect(response.status).toBe(404);
      });
    });
  });
});
