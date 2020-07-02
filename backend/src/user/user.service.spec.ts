import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken, InjectModel } from '@nestjs/mongoose';
import { UserDocument } from './user.schema';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(UserDocument.name),
          useValue: InjectModel(UserDocument.name),
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
