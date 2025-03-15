import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schemas';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../../configs/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { DEVELOPMENT_ENVIRONMENT } from 'src/environments/development.environments';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ]),
    PassportModule,
    JwtModule.register({
      secret: DEVELOPMENT_ENVIRONMENT.JWT_SECRET_KEY,
      signOptions: { expiresIn: '30d' },
    })
  ],
  providers: [AuthenticationService, JwtStrategy],
  controllers: [AuthenticationController]
})
export class AuthenticationModule {}
