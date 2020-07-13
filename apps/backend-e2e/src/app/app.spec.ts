import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../../backend/src/app/app.module';
import { MongooseConfigService } from '../../../backend/src/app/config/mongoose.config';
import { MongooseTestConfigService } from '../config/mongoose.config';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(MongooseConfigService)
      .useClass(MongooseTestConfigService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    expect(true).toBe(true);
  });
});
