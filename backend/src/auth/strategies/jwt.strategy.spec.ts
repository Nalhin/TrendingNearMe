import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../user/user.service';
import { getModelToken } from '@nestjs/mongoose';
import { mockModelFactory } from '../../../test/mocks/model.mock';
import { User } from '../../user/user.schema';
import { JwtStrategy } from './jwt.strategy';
import jwtConfig from '../../config/jwt.config';
import { appUserFactory } from '../../../test/fixtures/user.fixture';

describe('Jwt Strategy', () => {
  let strategy: JwtStrategy;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mockModelFactory(),
        },
        {
          provide: jwtConfig.KEY,
          useValue: { secret: 'dd' },
        },
      ],
    }).compile();

    strategy = module.get<JwtStrategy>(JwtStrategy);
    userService = module.get<UserService>(UserService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  describe('validate', () => {
    const callback = jest.fn();

    it('should return null if payload is empty', async () => {
      await strategy.validate({}, callback);

      expect(callback).toBeCalledWith(null, null);
    });

    it('should return auth user response', async () => {
      const appUser = appUserFactory.buildOne();
      jest
        .spyOn(userService, 'findOneByUsername')
        .mockResolvedValueOnce(appUser);

      await strategy.validate({ username: appUser.username }, callback);

      expect(callback).toBeCalledWith(null, appUser);
    });
  });
});
