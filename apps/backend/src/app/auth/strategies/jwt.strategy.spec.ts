import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../users/users.service';
import { getModelToken } from '@nestjs/mongoose';
import { mockModelFactory } from '../../../../test/mocks/model.mock';
import { User } from '../../users/users.schema';
import { JwtStrategy } from './jwt.strategy';
import jwtConfig from '../../config/jwt.config';
import { appUserFactory } from '../../../../test/fixtures/users.fixture';

describe('Jwt Strategy', () => {
  let strategy: JwtStrategy;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        UsersService,
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
    userService = module.get<UsersService>(UsersService);
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

    it('should return auth users response', async () => {
      const appUser = appUserFactory.buildOne();
      jest
        .spyOn(userService, 'findOneByUsername')
        .mockResolvedValueOnce(appUser);

      await strategy.validate({ username: appUser.username }, callback);

      expect(callback).toBeCalledWith(null, appUser);
    });
  });
});
