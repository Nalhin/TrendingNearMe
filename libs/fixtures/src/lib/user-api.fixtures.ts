import { UserResponseDto } from '@trends/data';
import * as faker from 'faker';
import { Factory } from 'factory.io';

export const userResponseDtoBuilder = new Factory<UserResponseDto>()
  .props({
    username: faker.internet.userName,
    email: faker.internet.email,
    _id: faker.random.uuid,
  })
  .done();
