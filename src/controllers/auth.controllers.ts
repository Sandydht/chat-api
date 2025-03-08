import express, { Request, Response } from 'express';
import { registerUserSchema } from '../validators/auth.validators';
import { errorHandler } from '../exceptions/custom-error-handler.exceptions';
import User from '../db/models/user.models';
import InvariantError from '../exceptions/commons/InvariantError';
import bcrypt from 'bcrypt';
import { RegisterUserResponse } from '../models/auth-controller.models';
import jwt from 'jsonwebtoken';

const app = express();

app.post('/register', async (req: Request, res: Response) => {
  try {
    const validate = registerUserSchema.parse(req.body);
    const findUser = await User.findOne({ phone_number: validate.phone_number });
    if (findUser) throw new InvariantError('Phone number already registered!');

    const passwordHash = bcrypt.hashSync(validate.password, 10);
    const user = new User({
      ...validate,
      password: passwordHash
    });
    const newUser = await user.save();
    const token = jwt.sign({ _id: newUser._id }, 'chat-app-key', { expiresIn: '30d' });

    const result: RegisterUserResponse = {
      status: 'OK',
      accessToken: token,
      data: {
        _id: newUser._id,
        photo_url: newUser.photo_url || null,
        name: newUser.name || null,
        phone_number: newUser.phone_number || null
      }
    };

    res.json(result);
  } catch (error) {
    errorHandler(res, error);
  }
});

export default app;
