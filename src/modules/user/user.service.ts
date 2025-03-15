import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schemas';
import { UserProfile } from './interface/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ) { }

  async getUserProfile(userID: string): Promise<UserProfile> {
    const findUser = await this.userModel.findById({ _id: userID }).lean().exec();
    if (!findUser) throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    return findUser as unknown as UserProfile;
  }
}
