import { Injectable } from '@nestjs/common';
import { User, AppUser } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDto } from '../auth/dto/register-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<AppUser>,
  ) {}

  async create(registerUserDto: RegisterUserDto): Promise<AppUser> {
    const createdUser = new this.userModel(registerUserDto);
    return await createdUser.save();
  }

  async findOneByUsername(username: string): Promise<AppUser | null> {
    return this.userModel.findOne({ username }).exec();
  }
}
