import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes } from "mongoose";

export type ChatRoomDocument = HydratedDocument<ChatRoom>;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  versionKey: false
})
export class ChatRoom {
  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: 'user'
  })
  sender_id: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: 'user'
  })
  recipient_id: string;

  @Prop({
    type: SchemaTypes.Boolean,
    required: true,
    default: false
  })
  is_read: boolean;

  @Prop({
    type: SchemaTypes.String,
    required: true,
    default: 'ACTIVE'
  })
  data_status: string;
}

export const ChatRoomSchema = SchemaFactory.createForClass(ChatRoom);
