import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { DEVELOPMENT_ENVIRONMENT } from "src/environments/development.environments";
import { UserJwtPayload } from "./interface/authentication.interface";
import { UserService } from "../user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: String(DEVELOPMENT_ENVIRONMENT.JWT_SECRET_KEY)
    });
  }

  async validate(payload: UserJwtPayload): Promise<UserJwtPayload> {
    return { _id: payload._id };
  }
}