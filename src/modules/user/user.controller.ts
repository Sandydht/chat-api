import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUserProfileResponse, GetUsersResponse } from './interface/user.interface';
import { JwtAuthGuard } from 'src/configs/jwt-auth/jwt-auth.guard';
import { Request as ExpressRequest } from 'express';
import { UserJwtPayload } from '../authentication/interface/authentication.interface';
import { getUserListData, getUserProfileData } from './transformer/user.transformer';

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
    const userProfileData = getUserProfileData(findUser);

    return {
      status: 'OK',
      data: userProfileData
    }
  }

  @Get('list')
  @UseGuards(JwtAuthGuard)
  async getUsers(@Request() req: ExpressRequest): Promise<GetUsersResponse> {
    const user = req.user as unknown as UserJwtPayload;
    const findUsers = await this.userService.getUsers(user._id);
    const mapUserData = getUserListData(findUsers);

    return {
      status: 'OK', 
      data: mapUserData
    };
  }
}
