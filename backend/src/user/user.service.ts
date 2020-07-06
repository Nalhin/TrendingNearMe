import { Injectable } from '@nestjs/common';
import { User, IUser } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDto } from '../auth/dto/register-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<IUser>,
  ) {}

  async create(registerUserDto: RegisterUserDto): Promise<IUser> {
    const createdUser = new this.userModel(registerUserDto);
    return await createdUser.save();
  }

  async findOneByUsername(username: string): Promise<IUser | null> {
    return this.userModel.findOne({ username }).exec();
  }
}
