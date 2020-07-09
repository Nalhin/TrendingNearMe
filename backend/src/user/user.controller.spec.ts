import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { appUserFactory } from '../../test/fixtures/user.fixture';
import { UserResponseDto } from './dto/user-response.dto';

describe('User Controller', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('me', () => {
    const appUser = appUserFactory.buildOne();

    it('should return user as JSON', () => {
      appUser.toJSON = jest.fn().mockReturnValue(appUser);

      const result = controller.me(appUser);

      expect(result).toEqual(appUser);
      expect(result).toBeInstanceOf(UserResponseDto);
    });
  });
});
