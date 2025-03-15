import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUserProfileResponse } from './interface/user.interface';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';
import { Request as ExpressRequest } from 'express';
import { UserJwtPayload } from '../authentication/interface/authentication.interface';

@Controller('chat-app/api/user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async profile(@Request() req: ExpressRequest): Promise<GetUserProfileResponse> {
    const user = req.user as unknown as UserJwtPayload;
    const findUser = await this.userService.getUserProfile(user._id);
    return {
      status: 'OK',
      data: {
        _id: findUser._id || null,
        photo_url: findUser.photo_url || null,
        name: findUser.name || null,
        phone_number: findUser.phone_number || null
      }
    }
  }
}
