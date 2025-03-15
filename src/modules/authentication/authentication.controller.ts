import { Body, Controller, Post } from '@nestjs/common';
import { RegisterAccountResponse } from './interface/authentication.interface';
import { RegisterAccountDto } from './dto/register-account.dto';
import { AuthenticationService } from './authentication.service';
import { LoginAccountDto } from './dto/login-account.dto';

@Controller('chat-app/api/authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService
  ) { }

  @Post('register-account')
  async register(@Body() registerAccountDto: RegisterAccountDto): Promise<RegisterAccountResponse> {
    const access_token = await this.authenticationService.registerAccount(registerAccountDto);
    return {
      status: 'OK',
      access_token
    };
  }

  @Post('login-account')
  async login(@Body() loginAccountDto: LoginAccountDto): Promise<RegisterAccountResponse> {
    const access_token = await this.authenticationService.loginAccount(loginAccountDto);
    return {
      status: 'OK',
      access_token
    };
  }
}
