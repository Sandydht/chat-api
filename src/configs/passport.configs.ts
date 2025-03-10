import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserData } from '../models/user-controller.models';

const passportConfig = () => {
  const JWTSecretKey: string = process.env.JWT_SECRET_KEY || 'secret';
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWTSecretKey,
  };

  passport.use(new Strategy(options, (payload: UserData, done) => {
    if (!payload._id) {
      return done(null, false);
    }

    return done(null, payload._id);
  }));
};

export default passportConfig;
