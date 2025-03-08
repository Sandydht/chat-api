import { Schema, SchemaTypes } from 'mongoose';

const userSchema = new Schema({
  photo_url: {
    type: SchemaTypes.String,
    required: false
  },
  name: {
    type: SchemaTypes.String,
    required: true
  },
  phone_number: {
    type: SchemaTypes.String,
    required: true
  },
  password: {
    type: SchemaTypes.String,
    required: true
  },
  status: {
    type: SchemaTypes.Number,
    required: true,
    default: 1
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

export default userSchema;
