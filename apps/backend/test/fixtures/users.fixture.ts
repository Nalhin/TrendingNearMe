import { Factory } from 'factory.io';
import { AppUser, UserDocument } from '../../src/app/users/users.schema';
import * as mongoose from 'mongoose';
import { RegisterUserDto } from '../../src/app/auth/dto/register-user.dto';
import { LoginUserDto } from '../../src/app/auth/dto/login-user.dto';
import { AuthUserResponseDto } from '../../src/app/auth/dto/auth-user-response.dto';
import {
  authUserResponseDtoBuilder,
  loginUserDtoBuilder,
  registerUserDtoBuilder,
} from '@trends/fixtures';

export const loginUserDtoFactory = new Factory(LoginUserDto)
  .mixins([loginUserDtoBuilder])
  .done();

export const registerUserDtoFactory = new Factory(RegisterUserDto)
  .mixins([registerUserDtoBuilder])
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

export const authUserResponseDtoFactory = new Factory(AuthUserResponseDto)
  .mixins([authUserResponseDtoBuilder])
  .done();
