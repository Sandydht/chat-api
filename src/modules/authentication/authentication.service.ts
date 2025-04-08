import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterAccountDto } from './dto/register-account.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import parsePhoneNumber, { E164Number } from 'libphonenumber-js';
import * as bcrypt from 'bcrypt';
import { LoginAccountDto } from './dto/login-account.dto';
import { RegisteredUserAccount } from './interface/authentication.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) { }

  async registerAccount(registerAccountDto: RegisterAccountDto): Promise<RegisteredUserAccount> {
    const phoneNumber = parsePhoneNumber(registerAccountDto.phone_number, 'ID');
    await this.validateRegisteredUser(phoneNumber?.number);
    const hashedPassword = await bcrypt.hash(registerAccountDto.password, Number(process.env.BCRYPT_SALT_ROUNDS));
    const newUser = new this.userModel({
      ...registerAccountDto,
      phone_number: phoneNumber?.number,
      password: hashedPassword
    });
    return newUser.save();
  }

  async loginAccount(loginAccountDto: LoginAccountDto): Promise<RegisteredUserAccount> {
    const phoneNumber = parsePhoneNumber(loginAccountDto.phone_number, 'ID');
    const findUser = await this.validateLoginUser(phoneNumber?.number);
    await this.validateUserPassword(loginAccountDto.password, findUser.password);
    return findUser;
  }

  async validateRegisteredUser(phone_number: string | E164Number | undefined): Promise<void> {
    const user = await this.userModel.findOne({ phone_number }).lean().exec();
    if (user) throw new HttpException('User already registered!', HttpStatus.BAD_REQUEST);
  }

  async validateLoginUser(phone_number: string | E164Number | undefined): Promise<RegisteredUserAccount> {
    const user = await this.userModel.findOne({ phone_number }).lean().exec();
    if (!user) throw new HttpException('Phone number or password incorrect!', HttpStatus.BAD_REQUEST);
    return user;
  }

  async validateUserPassword(password: string, userPasswordHash: string): Promise<void> {
    const isPasswordMatch = await bcrypt.compare(password, userPasswordHash);
    if (!isPasswordMatch) throw new HttpException('Phone number or password incorrect!', HttpStatus.BAD_REQUEST);
  }
}
