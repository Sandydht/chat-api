import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { UserProfile } from './interface/user.interface';
import { getUserListData, getUserProfileData } from './transformer/user.transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) { }

  async getUserProfile(userID: string): Promise<UserProfile> {
    const findUser = await this.userModel.findById({ _id: userID }).lean().exec();
    if (!findUser) throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    const userProfileData = getUserProfileData(findUser);
    return userProfileData;
  }

  async getUsers(userID: string): Promise<UserProfile[]> {
    const findUsers = await this.userModel
      .find({
        _id: { $ne: userID },
        data_status: 'ACTIVE'
      })
      .populate('is_contact')
      .sort({ created_at: -1 })
      .lean()
      .exec();
    
    const mapUserData = getUserListData(findUsers);
    return mapUserData;
  }
}
