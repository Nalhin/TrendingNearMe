import {
  AuthUserResponseDto,
  LoginUserDto,
  RegisterUserDto,
} from '../interfaces/api.interface';
import * as faker from 'faker';
import { Factory } from 'factory.io';
import { userResponseDtoBuilder } from './user-api.fixtures';

export const loginUserDtoBuilder = new Factory<LoginUserDto>()
  .props({
    username: faker.internet.userName,
    password: faker.internet.password,
  })
  .done();

export const registerUserDtoBuilder = new Factory<RegisterUserDto>()
  .mixins([loginUserDtoBuilder])
  .props({
    email: faker.internet.email,
  })
  .done();

export const authUserResponseDtoBuilder = new Factory<AuthUserResponseDto>()
  .props({
    user: userResponseDtoBuilder.buildOne,
    token: faker.random.word,
  })
  .done();
