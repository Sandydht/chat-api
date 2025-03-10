import { Schema } from 'mongoose';

const userSchema = new Schema({
  photo_url: {
    type: Schema.Types.String,
    required: false
  },
  name: {
    type: Schema.Types.String,
    required: true
  },
  phone_number: {
    type: Schema.Types.String,
    required: true
  },
  password: {
    type: Schema.Types.String,
    required: true
  },
  data_status: {
    type: Schema.Types.String,
    required: true,
    default: 'ACTIVE'
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  versionKey: false
});

export default userSchema;
