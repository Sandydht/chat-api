import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact } from 'src/schemas/contact.schema';
import { CreateContactDto } from './dto/create-contact.dto';
import { ContactData } from './interface/contact.interface';
import { User } from 'src/schemas/user.schema';
import { UserProfile } from '../user/interface/user.interface';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Contact.name) private readonly contactModel: Model<Contact>
  ) { }

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
        owner_id: ownerID,
        data_status: 'ACTIVE'
      })
      .populate('member_id')
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
