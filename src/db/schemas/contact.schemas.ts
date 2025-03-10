import { Schema } from 'mongoose';

const contactSchema = new Schema({
  owner_id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  member_id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
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
  }
});

export default contactSchema;
