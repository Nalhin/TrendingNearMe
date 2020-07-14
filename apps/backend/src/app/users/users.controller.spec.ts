import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { appUserFactory } from '../../../test/fixtures/users.fixture';
import { UserResponseDto } from './dto/user-response.dto';

describe('User Controller', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('me', () => {
    const appUser = appUserFactory.buildOne();

    it('should return users as JSON', () => {
      appUser.toJSON = jest.fn().mockReturnValue(appUser);

      const result = controller.me(appUser);

      expect(result).toEqual(appUser);
      expect(result).toBeInstanceOf(UserResponseDto);
    });
  });
});
