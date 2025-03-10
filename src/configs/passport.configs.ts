import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserData } from '../models/user-controller.models';
import User from '../db/models/user.models';

const passportConfig = () => {
  const JWTSecretKey: string = process.env.JWT_SECRET_KEY || 'secret';
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWTSecretKey,
  };

  passport.use(new Strategy(options, async (payload: UserData, done) => {
    try {
      const userID = payload._id;
      const findUser = await User.findById(userID).lean();
      if (!findUser) return done(null, false);
      
      const userData: UserData = {
        _id: findUser._id,
        name: findUser.name,
        phone_number: findUser.phone_number,
        data_status: findUser.data_status
      };
      return done(null, userData);
    } catch (error) {
      return done(error, false);
    }
  }));
};

export default passportConfig;
