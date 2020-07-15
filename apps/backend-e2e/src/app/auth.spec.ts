import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '@trends/backend/src/app/app.module';
import { MongooseConfigService } from '@trends/backend/src/app/config/mongoose.config';
import { MongooseTestConfigService } from '../config/mongoose.config';
import {
  loginUserDtoFactory,
  registerUserDtoFactory,
  userDocumentFactory,
} from '@trends/backend/test/fixtures/users.fixture';
import * as request from 'supertest';
import { MongooseTestUtils } from '../utils/mongoose.test-utils';
import { User } from '@trends/backend/src/app/users/users.schema';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let testUtils: MongooseTestUtils;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, MongooseTestUtils],
    })
      .overrideProvider(MongooseConfigService)
      .useClass(MongooseTestConfigService)
      .compile();

    app = moduleFixture.createNestApplication();
    testUtils = moduleFixture.get<MongooseTestUtils>(MongooseTestUtils);
    await app.init();
  });

  beforeEach(async () => {
    await testUtils.clearAll();
  });

  describe('/login (POST)', () => {
    const user = userDocumentFactory.buildOne();

    beforeEach(async () => {
      await testUtils.save(User, user);
    });

    it('should login user with valid credentials', async () => {
      const loginUserDto = loginUserDtoFactory.buildOne({
        username: user.username,
        password: user.password,
      });

      const { body } = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginUserDto)
        .expect(201);

      expect(body.user.username).toBe(loginUserDto.username);
      expect(body.token).toBeTruthy();
    });

    it('should not login user with invalid credentials', () => {
      const loginUserDto = loginUserDtoFactory.buildOne();

      return request(app.getHttpServer())
        .post('/auth/login')
        .send(loginUserDto)
        .expect(401);
    });

    it('should return errors if body is invalid', async () => {
      const loginUserDto = loginUserDtoFactory.buildOne({ password: 'short' });

      const { body } = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginUserDto)
        .expect(400);

      expect(body.message.length).toBe(1);
    });
  });

  describe('/register (POST)', () => {
    it('should register user', async () => {
      const registerUserDto = registerUserDtoFactory.buildOne();

      const { body } = await request(app.getHttpServer())
        .post('/auth/register')
        .send(registerUserDto)
        .expect(201);

      expect(body.user.username).toBe(registerUserDto.username);
      expect(body.token).toBeTruthy();
    });

    it('should return errors if body is invalid', async () => {
      const registerUserDto = registerUserDtoFactory.buildOne({
        email: 'fake',
        password: 'short',
      });

      const { body } = await request(app.getHttpServer())
        .post('/auth/register')
        .send(registerUserDto)
        .expect(400);

      expect(body.message.length).toBe(2);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
