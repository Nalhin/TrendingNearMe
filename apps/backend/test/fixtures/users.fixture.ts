import { Factory } from 'factory.io';
import { AppUser, UserDocument } from '../../src/app/users/users.schema';
import * as faker from 'faker';
import * as mongoose from 'mongoose';
import { RegisterUserDto } from '../../src/app/auth/dto/register-user.dto';
import { LoginUserDto } from '../../src/app/auth/dto/login-user.dto';
import { AuthUserResponseDto } from '../../src/app/auth/dto/auth-user-response.dto';
import { UserResponseDto } from '../../src/app/users/dto/user-response.dto';

export const loginUserDtoFactory = new Factory(LoginUserDto)
  .props({
    username: faker.internet.userName,
    password: faker.internet.password,
  })
  .done();

export const registerUserDtoFactory = new Factory(RegisterUserDto)
  .props({
    email: faker.internet.email,
  })
  .mixins([loginUserDtoFactory])
  .done();

export const appUserFactory = new Factory<AppUser>()
  .props({
    _id: mongoose.Types.ObjectId,
  })
  .mixins([registerUserDtoFactory])
  .done();

export const userDocumentFactory = new Factory<UserDocument>()
  .mixins([appUserFactory])
  .done();

export const userResponseDtoFactory = new Factory(UserResponseDto)
  .props({
    username: faker.internet.userName,
    email: faker.internet.email,
    _id: () => mongoose.Types.ObjectId.toString(),
  })
  .done();

export const authUserResponseDtoFactory = new Factory(AuthUserResponseDto)
  .props({
    user: userResponseDtoFactory.buildOne,
    token: faker.random.word,
  })
  .done();
