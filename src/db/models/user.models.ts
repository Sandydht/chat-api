import mongoose from 'mongoose';
import userSchema from '../schemas/user.schemas';

const user = mongoose.model('user', userSchema);
export default user;
