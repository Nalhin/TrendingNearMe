import { Test, TestingModule } from '@nestjs/testing';
import { HttpService, INestApplication } from '@nestjs/common';
import { AppModule } from '@trends/backend/src/app/app.module';
import { MongooseConfigService } from '@trends/backend/src/app/config/mongoose.config';
import { MongooseTestConfigService } from '../config/mongoose.config';
import { trendDocumentFactory } from '@trends/backend/test/fixtures/trends.fixture';
import { Trend } from '@trends/backend/src/app/trends/trends.schema';
import { MongooseTestUtils } from '../utils/mongoose.test-utils';
import * as request from 'supertest';
import {
  appUserFactory,
  userDocumentFactory,
} from '@trends/backend/test/fixtures/users.fixture';
import { authHeaderFactory } from '../utils/auth.utils';
import {
  AppUser,
  User,
  UserDocument,
} from '@trends/backend/src/app/users/users.schema';
import { of } from 'rxjs';
import {
  twitterClosestResponse,
  twitterTrendResponse,
} from '@trends/backend/test/fixtures/twitter-response.fixture';
import { AxiosResponse } from 'axios';

describe('TrendsController (e2e)', () => {
  let app: INestApplication;
  let httpService: HttpService;
  let testUtils: MongooseTestUtils;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, MongooseTestUtils],
    })
      .overrideProvider(MongooseConfigService)
      .useClass(MongooseTestConfigService)
      .compile();

    app = moduleFixture.createNestApplication();
    httpService = moduleFixture.get<HttpService>(HttpService);
    testUtils = moduleFixture.get<MongooseTestUtils>(MongooseTestUtils);
    await app.init();
  });

  beforeEach(async () => {
    await testUtils.clearAll();
  });

  describe('/location (GET)', () => {
    const query = { lat: 1, lng: 1 };

    beforeEach(() => {
      jest.clearAllMocks();
      jest
        .spyOn(httpService, 'get')
        .mockReturnValueOnce(
          of({ data: twitterClosestResponse } as AxiosResponse),
        )
        .mockReturnValueOnce(
          of({
            data: twitterTrendResponse,
          } as AxiosResponse),
        );
    });

    it('should return current trends', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/trends/location')
        .query(query)
        .expect(200);

      expect(body.length).toBe(1);
      expect((await testUtils.getAll(Trend)).length).toBe(0);
    });

    it('should persist data to db, if user is authorized', async () => {
      const user = await testUtils.save(User, userDocumentFactory.buildOne());
      const header = authHeaderFactory(user.username);

      const { body } = await request(app.getHttpServer())
        .get('/trends/location')
        .query(query)
        .set('Authorization', header)
        .expect(200);

      expect(body.length).toBe(1);
    });
  });

  describe('/history (GET)', () => {
    let user: UserDocument;
    let header: string;

    beforeEach(async () => {
      user = await testUtils.save(User, userDocumentFactory.buildOne());
      await testUtils.saveMany(
        Trend,
        trendDocumentFactory.buildMany(3).map((u) => ({ ...u, user })),
      );
      await testUtils.saveMany(Trend, trendDocumentFactory.buildMany(2));
      header = authHeaderFactory(user.username);
    });

    it('should user search history', async () => {
      const { body } = await request(app.getHttpServer())
        .get(`/trends/history`)
        .set('Authorization', header)
        .expect(200);

      expect(body.length).toBe(3);
    });
  });

  describe('/history/:id (GET)', () => {
    let user: UserDocument;
    let header: string;

    beforeEach(async () => {
      user = await testUtils.save(User, appUserFactory.buildOne());
      header = authHeaderFactory(user.username);
    });

    it('should return search history details', async () => {
      const trendData = trendDocumentFactory.buildOne({
        user: user as AppUser,
      });
      trendData.user._id = user._id;
      const trend = await testUtils.save(Trend, trendData);

      const { body } = await request(app.getHttpServer())
        .get(`/trends/history/${trend._id}`)
        .set('Authorization', header)
        .expect(200);

      expect(body._id).toBe(trend._id.toString());
    });

    it('should return error if user is not authorized', async () => {
      const trend = await testUtils.save(
        Trend,
        trendDocumentFactory.buildOne(),
      );

      return request(app.getHttpServer())
        .get(`/trends/history/${trend._id}`)
        .set('Authorization', header)
        .expect(401);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
