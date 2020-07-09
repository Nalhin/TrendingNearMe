import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { AppUser, User } from './user.schema';
import {
  registerUserDtoFactory,
  appUserFactory,
} from '../../test/fixtures/user.fixture';
import { mockModelFactory } from '../../test/mocks/model.mock';
import { DocumentQuery, Model } from 'mongoose';
import { createMock } from '@golevelup/nestjs-testing';

describe('UserService', () => {
  let service: UserService;
  let model: Model<AppUser>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mockModelFactory(),
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    model = module.get<Model<AppUser>>(getModelToken(User.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create user', () => {
    const registerUserDto = registerUserDtoFactory.buildOne();

    it('should save user', async () => {
      const expectedResult = appUserFactory.buildOne(registerUserDto);
      jest.spyOn(model, 'create').mockResolvedValueOnce(expectedResult);

      const response = await service.create(registerUserDto);

      expect(response).toBe(expectedResult);
    });
  });

  describe('findOneByUsername', () => {
    const user = appUserFactory.buildOne();
    it('should return user with given username', async () => {
      jest.spyOn(model, 'findOne').mockReturnValueOnce(
        createMock<DocumentQuery<AppUser, AppUser, unknown>>({
          exec: jest.fn().mockResolvedValueOnce(user),
        }),
      );

      const result = await service.findOneByUsername(user.username);

      expect(result).toBe(user);
    });
  });
});
