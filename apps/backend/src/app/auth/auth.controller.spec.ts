import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../users/users.schema';
import { JwtModule } from '@nestjs/jwt';
import { mockModelFactory } from '../../../test/mocks/model.mock';
import {
  authUserResponseDtoFactory,
  loginUserDtoFactory,
  registerUserDtoFactory,
} from '../../../test/fixtures/users.fixture';
import { AuthUserResponseDto } from './dto/auth-user-response.dto';

describe('Auth Controller', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({ secret: 'test' })],
      providers: [
        UsersService,
        AuthService,
        {
          provide: getModelToken(User.name),
          useValue: mockModelFactory(),
        },
      ],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    const loginUserDto = loginUserDtoFactory.buildOne();
    const authUser = authUserResponseDtoFactory.buildOne();

    it('should return auth users response', async () => {
      jest.spyOn(authService, 'login').mockResolvedValueOnce(authUser);

      const result = await controller.login(loginUserDto);

      expect(result).toEqual(authUser);
      expect(result).toBeInstanceOf(AuthUserResponseDto);
    });
  });

  describe('register', () => {
    const registerUserDto = registerUserDtoFactory.buildOne();
    const authUser = authUserResponseDtoFactory.buildOne();

    it('should return auth users response', async () => {
      jest.spyOn(authService, 'register').mockResolvedValueOnce(authUser);

      const result = await controller.register(registerUserDto);

      expect(result).toEqual(authUser);
      expect(result).toBeInstanceOf(AuthUserResponseDto);
    });
  });
});
