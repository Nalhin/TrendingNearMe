import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../user/user.service';
import { getModelToken } from '@nestjs/mongoose';
import { mockModelFactory } from '../../../test/mocks/model.mock';
import { User } from '../../user/user.schema';
import { JwtStrategy } from './jwt.strategy';

describe('Jwt Strategy', () => {
  let strategy: JwtStrategy;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mockModelFactory(),
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  describe('validate', () => {
    const callback = jest.fn();

    it('should return null if payload is empty', () => {
      strategy.validate({}, callback);

      expect(callback).toBeCalledWith(null, null);
    });

    it('should return auth user response', async () => {

    });
  });


});
