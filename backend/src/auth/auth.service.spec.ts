import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../user/user.schema';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { mockModelFactory } from '../../test/mocks/model.mock';
import { UnauthorizedException } from '@nestjs/common';
import {
  appUserFactory,
  loginUserDtoFactory,
  registerUserDtoFactory,
} from '../../test/fixtures/user.fixture';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({ secret: 'test' })],
      providers: [
        AuthService,
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mockModelFactory(),
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('login', () => {
    const loginUserDto = loginUserDtoFactory.buildOne();
    const appUser = appUserFactory.buildOne(loginUserDto);

    it('should throw error if user it not present', async () => {
      jest.spyOn(userService, 'findOneByUsername').mockResolvedValueOnce(null);

      await expect(authService.login(loginUserDto)).rejects.toThrowError(
        UnauthorizedException,
      );
    });

    it('should throw error if passwords dont match', async () => {
      appUser.comparePassword = jest.fn().mockResolvedValueOnce(false);
      jest
        .spyOn(userService, 'findOneByUsername')
        .mockResolvedValueOnce(appUser);

      await expect(authService.login(loginUserDto)).rejects.toThrowError(
        UnauthorizedException,
      );
    });

    it('should return user with corresponding auth token', async () => {
      const token = 'token';
      appUser.comparePassword = jest.fn().mockResolvedValueOnce(true);
      jest
        .spyOn(userService, 'findOneByUsername')
        .mockResolvedValueOnce(appUser);
      jest.spyOn(jwtService, 'sign').mockReturnValueOnce(token);

      const result = await authService.login(loginUserDto);

      expect(result.user).toEqual(appUser);
      expect(result.token).toBe(token);
    });
  });

  describe('register', () => {
    const registerUserDto = registerUserDtoFactory.buildOne();
    const appUser = appUserFactory.buildOne(registerUserDto);

    it('should save and return user with corresponding auth token', async () => {
      const token = 'token';
      jest.spyOn(userService, 'create').mockResolvedValueOnce(appUser);
      jest.spyOn(jwtService, 'sign').mockReturnValueOnce(token);

      const result = await authService.register(registerUserDto);

      expect(result.user).toEqual(appUser);
      expect(result.token).toBe(token);
    });
  });
});
