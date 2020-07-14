import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../../backend/src/app/app.module';
import { MongooseConfigService } from '../../../backend/src/app/config/mongoose.config';
import { MongooseTestConfigService } from '../config/mongoose.config';
import { MongooseTestUtils } from '../utils/mongoose.test-utils';
import { userDocumentFactory } from '../../../backend/test/fixtures/users.fixture';
import { User } from '../../../backend/src/app/users/users.schema';
import { authHeaderFactory } from '../utils/auth.utils';
import * as request from 'supertest';

describe('UsersController (e2e)', () => {
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

  describe('/me (GET)', () => {
    const user = userDocumentFactory.buildOne();
    const header = authHeaderFactory(user.username);

    beforeEach(async () => {
      await testUtils.save(User, user);
    });

    it('should return current user if token is valid', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/users/me')
        .set('Authorization', header)
        .expect(200);

      expect(body.username).toBe(user.username);
    });

    it('should return error if token is invalid', () => {
      return request(app.getHttpServer())
        .get('/users/me')
        .set('Authorization', 'fake')
        .expect(403);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
