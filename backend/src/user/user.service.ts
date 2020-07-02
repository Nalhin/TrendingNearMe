import { Injectable } from '@nestjs/common';
import { UserDocument, UserModel } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDto } from '../auth/dto/register-user.dto';


@Injectable()
export class UserService {

  constructor(@InjectModel(UserDocument.name) private readonly userModel: Model<UserModel>) {
  }

  async create(registerUserDto: RegisterUserDto): Promise<UserModel> {
    const createdUser = new this.userModel(registerUserDto);
    return createdUser.save();
  }

  async findOneByUsername(username: string): Promise<UserModel | null> {
    return this.userModel.findOne({ username });
  }
}
