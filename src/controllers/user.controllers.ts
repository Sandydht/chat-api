import express, { Request, Response } from 'express';
import passport from 'passport';
import { errorHandler } from '../exceptions/custom-error-handler.exceptions';
import User from '../db/models/user.models';
import AuthorizationError from '../exceptions/commons/AuthorizationError';
import { ProfileUserResponse, UserData } from '../models/user-controller.models';

const app = express();

app.get('/profile', passport.authenticate('jwt', { session: false, failureRedirect: '/unauthorized' }), async (req: Request, res: Response) => {
  try {
    if (!req.user) throw new AuthorizationError('Unauthorized');

    const userData = req.user as UserData;
    const findUser = await User.findById(userData._id).lean();
    if (!findUser) throw new AuthorizationError('Unauthorized');

    const result: ProfileUserResponse = {
      status: 'OK',
      data: {
        _id: findUser._id,
        photo_url: findUser.photo_url || null,
        name: findUser.name || null,
        phone_number: findUser.phone_number || null,
        data_status: findUser.data_status || null,
      }
    };
    res.json(result);
  } catch (error) {
    errorHandler(res, error);
  }
});

export default app;
