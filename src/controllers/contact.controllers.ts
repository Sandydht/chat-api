import express, { Request, Response } from 'express';
import passport from 'passport';
import { errorHandler } from '../exceptions/custom-error-handler.exceptions';
import { addNewContactSchema } from '../validators/contact.validators';
import User from '../db/models/user.models';
import NotFoundError from '../exceptions/commons/NotFoundError';
import { USER_SCHEMA } from '../constants/user-schema.constants';
import Contact from '../db/models/contact.models';
import { AddNewContactResponse } from '../models/contact-controller.models';
import AuthorizationError from '../exceptions/commons/AuthorizationError';
import { UserData } from '../models/user-controller.models';

const app = express();

app.post('/add-contact', passport.authenticate('jwt', { session: false, failureRedirect: '/unauthorized' }), async (req: Request, res: Response) => {
  try {
    if (!req.user) throw new AuthorizationError('Unauthorized');

    const user = req.user as UserData;
    const validate = addNewContactSchema.parse(req.body);

    const findMemberData = await User.findOne({ _id: validate.member_id, data_status: USER_SCHEMA.DATA_STATUS_ACTIVE }).lean();
    if (!findMemberData) throw new NotFoundError('User data is not found!');

    const contact = new Contact({
      owner_id: user._id,
      member_id: validate.member_id
    });
    const newContact = await contact.save();

    const result: AddNewContactResponse = {
      member_id: newContact._id || null,
      data_status: newContact.data_status || null
    };

    res.json({ status: 'OK', result });
  } catch (error) {
    errorHandler(res, error);
  }
});

export default app;
