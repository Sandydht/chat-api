import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LogoutAccountResponse, RegisterAccountResponse } from './interface/authentication.interface';
import { RegisterAccountDto } from './dto/register-account.dto';
import { AuthenticationService } from './authentication.service';
import { LoginAccountDto } from './dto/login-account.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';
import { Request as ExpressRequest } from 'express';

@Controller('chat-app/api/authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly jwtService: JwtService
  ) { }

  @Post('register')
  async register(@Body() registerAccountDto: RegisterAccountDto): Promise<RegisterAccountResponse> {
    const user = await this.authenticationService.registerAccount(registerAccountDto);
    const access_token = this.jwtService.sign({ _id: user._id });
    return {
      status: 'OK',
      access_token
    };
  }

  @Post('login')
  async login(@Body() loginAccountDto: LoginAccountDto): Promise<RegisterAccountResponse> {
    const user = await this.authenticationService.loginAccount(loginAccountDto);
    const access_token = this.jwtService.sign({ _id: user._id });
    return {
      status: 'OK',
      access_token
    };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Request() req: ExpressRequest): Promise<LogoutAccountResponse> {
    req.logout((error: any) => {
      if (error) {
        return {
          sratus: 'error',
          message: error?.message
        };
      }
    });

    return {
      status: 'OK',
      message: 'See you!'
    };
  }
}
