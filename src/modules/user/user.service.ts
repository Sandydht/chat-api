import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schemas';
import { UserProfile } from './interface/user.interface';
import { Contact } from 'src/schemas/contact.schemas';
import { ContactData } from './interface/contact.interface';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Contact.name) private readonly contactModel: Model<Contact>
  ) { }

  async getUserProfile(userID: string): Promise<UserProfile> {
    const findUser = await this.userModel.findById({ _id: userID }).lean().exec();
    if (!findUser) throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    return findUser as unknown as UserProfile;
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
    return findUsers as unknown as UserProfile[];
  }

  async saveUser(createContactDto: CreateContactDto): Promise<ContactData> {
    const findUser = await this.validateUserData(createContactDto.memberID);
    const contact = await this.contactModel.create({
      owner_id: createContactDto.ownerID,
      member_id: findUser._id
    });
    return contact as unknown as ContactData;
  }

  async contactList(ownerID: string): Promise<any> {
    const findContacts = await this.contactModel
      .find({
        owner_id: ownerID
      })
      .lean()
      .exec();
    return findContacts;
  }

  async validateUserData(userID: string): Promise<UserProfile> {
    const findUser = await this.userModel.findById({ _id: userID }).lean().exec();
    if (!findUser) throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    return findUser as unknown as UserProfile;
  }
}
