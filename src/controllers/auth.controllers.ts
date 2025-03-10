import express, { NextFunction, Request, Response } from 'express';
import {
  registerUserSchema,
  loginUserSchema
} from '../validators/auth.validators';
import { errorHandler } from '../exceptions/custom-error-handler.exceptions';
import User from '../db/models/user.models';
import InvariantError from '../exceptions/commons/InvariantError';
import bcrypt from 'bcrypt';
import { RegisterUserResponse } from '../models/auth-controller.models';
import jwt from 'jsonwebtoken';
import parsePhoneNumber from 'libphonenumber-js';
import passport from 'passport';
import { USER_SCHEMA } from '../constants/user-schema.constants';

const app = express();
const JWTSecretKey: string = process.env.JWT_SECRET_KEY || 'secret';

app.post('/register', async (req: Request, res: Response) => {
  try {
    const validate = registerUserSchema.parse(req.body);

    const phoneNumber = parsePhoneNumber(validate.phone_number, 'ID');
    if (!phoneNumber?.isValid()) throw new InvariantError('Phone number is invalid!');

    const findUser = await User.findOne({ phone_number: phoneNumber.number }).lean();
    if (findUser) throw new InvariantError('Phone number already registered!');

    const passwordHash = bcrypt.hashSync(validate.password, 10);
    const user = new User({
      ...validate,
      password: passwordHash,
      phone_number: phoneNumber.number
    });
    const newUser = await user.save();
    const token = jwt.sign({ _id: newUser._id }, JWTSecretKey);

    const result: RegisterUserResponse = {
      status: 'OK',
      access_token: token
    };

    res.json(result);
  } catch (error) {
    errorHandler(res, error);
  }
});

app.post('/login', async (req: Request, res: Response) => {
  try {
    const validate = loginUserSchema.parse(req.body);

    const phoneNumber = parsePhoneNumber(validate.phone_number, 'ID');
    if (!phoneNumber?.isValid()) throw new InvariantError('Phone number is invalid!');

    const findUser = await User.findOne({ phone_number: phoneNumber.number, data_status: USER_SCHEMA.DATA_STATUS_ACTIVE }).lean();
    if (!findUser) throw new InvariantError('Login failed!');

    const isValidPassword = bcrypt.compareSync(validate.password, findUser.password);
    if (!isValidPassword) throw new InvariantError('Login failed!');

    const token = jwt.sign({ _id: findUser._id }, JWTSecretKey);
    const result: RegisterUserResponse = {
      status: 'OK',
      access_token: token
    };

    res.json(result);
  } catch (error) {
    errorHandler(res, error);
  }
});

app.post('/logout', passport.authenticate('jwt', { session: false, failureRedirect: '/unauthorized' }), async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.logout((error) => {
      if (error) next(error);
      res.json({ status: 'OK', message: 'See u' });
    });
  } catch (error) {
    errorHandler(res, error);
  }
});

export default app;
