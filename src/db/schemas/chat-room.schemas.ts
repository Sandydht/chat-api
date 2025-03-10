import { Schema } from 'mongoose';

const chatRoomSchema = new Schema({
  sender_id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  recipient_id: {
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

export default chatRoomSchema;
