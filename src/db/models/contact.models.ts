import mongoose from 'mongoose';
import contactSchema from '../schemas/contact.schemas';

const contact = mongoose.model('contact', contactSchema);
export default contact;
