import { Controller, Post, UseGuards, Request, Body, Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/configs/jwt-auth/jwt-auth.guard';
import { Request as ExpressRequest } from 'express';
import { SaveContactRequest, SaveContactResponse } from './interface/contact.interface';
import { UserJwtPayload } from '../authentication/interface/authentication.interface';
import { ContactService } from './contact.service';

@Controller('chat-app/api/contact')
export class ContactController {
  constructor(
    private readonly contactService: ContactService
  ) { }

  @Post('save-contact')
  @UseGuards(JwtAuthGuard)
  async saveContact(@Request() req: ExpressRequest, @Body() payload: SaveContactRequest): Promise<SaveContactResponse> {
    const user = req.user as unknown as UserJwtPayload;
    await this.contactService.saveUser({
      ownerID: user._id,
      memberID: payload.member_id
    });

    return {
      status: 'OK',
      message: 'Contact saved successfully'
    };
  }

  @Get('contact-list')
  @UseGuards(JwtAuthGuard)
  async contactList(@Request() req: ExpressRequest) {
    const user = req.user as unknown as UserJwtPayload; 
    const contactListData = await this.contactService.contactList(user._id);

    return {
      status: 'OK',
      data: contactListData
    };
  }
}
