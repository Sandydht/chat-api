import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import User from '../db/models/user.models';
import { RegisterUserData } from '../models/auth-controller.models';

const passportConfig = () => {
  const JWTSecretKey: string = process.env.JWT_SECRET_KEY || 'secret';
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWTSecretKey,
  };

  passport.use(new Strategy(options, async (payload: RegisterUserData, done) => {
    try {
      const findUser = await User.findById(payload._id).lean();
      if (!findUser) return done(null, false);

      const userData: RegisterUserData = {
        _id: findUser._id || null,
        photo_url: findUser.photo_url || null,
        name: findUser.name || null,
        phone_number: findUser.phone_number || null
      };
      return done(null, userData);
    } catch (error) {
      return done(error);
    }
  }));
};

export default passportConfig;
