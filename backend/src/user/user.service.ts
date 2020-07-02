import { Injectable } from '@nestjs/common';
import { UserDocument, User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDto } from '../auth/dto/register-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserDocument.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(registerUserDto: RegisterUserDto): Promise<User> {
    const createdUser = new this.userModel(registerUserDto);
    return await createdUser.save();
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return this.userModel
      .findOne({ username })
      .exec();
  }
}
